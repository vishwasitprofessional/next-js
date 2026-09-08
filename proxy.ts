import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get JWT from cookie
  const token = request.cookies.get("access_token")?.value;

  // User is not logged in
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Verify JWT
  const user = await verifyToken(token);

  // Invalid or expired token
  if (!user) {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    response.cookies.delete("access_token");

    return response;
  }

  // -----------------------------
  // ADMIN ROUTES
  // -----------------------------

  if (pathname.startsWith("/admin")) {
    if (user.type !== "admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
        // new URL("/user/dashboard", request.url)
      );
    }
  }

  // -----------------------------
  // USER ROUTES
  // -----------------------------

  if (pathname.startsWith("/user")) {
    if (user.type !== "user") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  // Authorized
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
  ],
};