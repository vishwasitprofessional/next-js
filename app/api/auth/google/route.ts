import { randomBytes, createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { googleConfig, googleCookie, googleCookieOptions, googleFailure } from "@/app/lib/google-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("mode") === "signup" ? "signup" : "login";
  const rememberMe = request.nextUrl.searchParams.get("rememberMe") === "true";
  let config;
  try {
    config = googleConfig();
  } catch {
    return googleFailure(request.nextUrl.origin, "configuration", mode);
  }
  const state = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(googleCookie, JSON.stringify({ state, nonce, verifier, mode, rememberMe, expires: Date.now() + 600_000 }), {
    ...googleCookieOptions,
    maxAge: 600,
  });
  return response;
}
