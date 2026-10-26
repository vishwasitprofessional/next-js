import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { RowDataPacket } from "mysql2";
import pool from "@/app/config/db";
import { createToken, getSessionMaxAge } from "@/app/lib/auth";
import { googleConfig, googleCookie, googleCookieOptions, googleFailure } from "@/app/lib/google-auth";

export const runtime = "nodejs";
const googleKeys = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

interface LoginUser extends RowDataPacket {
  id: number;
  email: string;
  type: string;
  status: number;
}

export async function GET(request: NextRequest) {
  let config;
  try {
    config = googleConfig();
  } catch {
    return googleFailure(request.nextUrl.origin, "configuration");
  }
  let mode: "login" | "signup" = "login";
  const fail = (error: string) => googleFailure(config.origin, error, mode);
  try {
    const transaction = JSON.parse(request.cookies.get(googleCookie)?.value || "null");
    mode = transaction?.mode === "signup" ? "signup" : "login";
    const params = request.nextUrl.searchParams;
    if (!transaction || typeof transaction.state !== "string" ||
        typeof transaction.nonce !== "string" || typeof transaction.verifier !== "string" ||
        typeof transaction.expires !== "number" || transaction.expires < Date.now() ||
        params.get("state") !== transaction.state) {
      return fail("session");
    }
    if (params.has("error")) return fail("cancelled");
    const code = params.get("code");
    if (!code) return fail("session");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        grant_type: "authorization_code",
        code_verifier: transaction.verifier,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!tokenResponse.ok) return fail("failed");
    const tokens = await tokenResponse.json();
    if (typeof tokens.id_token !== "string") return fail("failed");
    const { payload } = await jwtVerify(tokens.id_token, googleKeys, {
      issuer: ["https://accounts.google.com", "accounts.google.com"],
      audience: config.clientId,
      algorithms: ["RS256"],
      requiredClaims: ["sub", "exp", "iat", "nonce", "email"],
    });
    if (payload.nonce !== transaction.nonce || payload.email_verified !== true ||
        typeof payload.email !== "string" ||
        (payload.azp !== undefined && payload.azp !== config.clientId)) return fail("failed");

    // Only match existing accounts when Google is authoritative for the email.
    if (!payload.email.toLowerCase().endsWith("@gmail.com") &&
        !(typeof payload.hd === "string" && payload.hd.length > 0)) return fail("email");

    let [users] = await pool.execute<LoginUser[]>(
      "SELECT id, email, type, status FROM users WHERE email = ? LIMIT 2",
      [payload.email],
    );
    if (users.length === 0 && mode === "signup") {
      // A random, undisclosed password keeps Google accounts compatible with
      // the existing NOT NULL password column without enabling password login.
      const password = await bcrypt.hash(randomBytes(32).toString("base64url"), 12);
      const name = (typeof payload.name === "string" && payload.name.trim()
        ? payload.name.trim() : payload.email.split("@")[0]).slice(0, 100);
      try {
        await pool.execute(
          "INSERT INTO users (name, email, phone, password, type, status) VALUES (?, ?, NULL, ?, 'user', 1)",
          [name, payload.email.toLowerCase(), password],
        );
      } catch (error) {
        // Another request may have registered this email in the meantime.
        if ((error as { code?: string }).code !== "ER_DUP_ENTRY") throw error;
      }
      [users] = await pool.execute<LoginUser[]>(
        "SELECT id, email, type, status FROM users WHERE email = ? LIMIT 2",
        [payload.email],
      );
    }
    if (users.length !== 1) return fail("account");
    const user = users[0];
    if (user.status !== 1) return fail("inactive");
    if (user.type !== "admin" && user.type !== "user") return fail("account");

    const rememberMe = transaction.rememberMe === true;
    const token = await createToken({ id: user.id, email: user.email, type: user.type }, rememberMe);
    const response = NextResponse.redirect(new URL(`/${user.type}/dashboard`, config.origin));
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: process.env.NEXT_PUBLIC_SUB_FOLDER || "/",
      maxAge: getSessionMaxAge(rememberMe),
    });
    response.cookies.set(googleCookie, "", { ...googleCookieOptions, maxAge: 0 });
    return response;
  } catch {
    // Never log OAuth codes, tokens, or client credentials.
    return fail("failed");
  }
}
