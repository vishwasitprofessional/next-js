import { NextResponse } from "next/server";

export const googleCookie = "google_oauth";
export const googleCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/auth/google",
};

export function googleConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const appUrl = process.env.APP_URL;
  if (!clientId || !clientSecret || !appUrl) {
    throw new Error("Google OAuth configuration is missing");
  }
  const origin = new URL(appUrl).origin;
  if (process.env.NODE_ENV === "production" && !origin.startsWith("https://")) {
    throw new Error("APP_URL must use HTTPS in production");
  }
  return { clientId, clientSecret, origin, redirectUri: `${origin}/api/auth/google/callback` };
}

export function googleFailure(origin: string, error: string, mode: "login" | "signup" = "login") {
  const url = new URL(mode === "signup" ? "/signup" : "/login", origin);
  url.searchParams.set("google_error", error);
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(googleCookie, "", { ...googleCookieOptions, maxAge: 0 });
  return response;
}
