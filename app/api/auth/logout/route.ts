import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {


  const response = NextResponse.json(
    { success: true, message: "Logout successful" },
    { headers: { "Cache-Control": "no-store" } },
  );
  // Password login can scope its cookie to the base path, while Google login
  // and profile updates use "/". Expire both, including existing sessions.
  const basePath = process.env.NEXT_PUBLIC_SUB_FOLDER || "/";
  const paths = new Set(["/", basePath, basePath.replace(/\/$/, "") || "/"]);
  for (const path of paths) {
    const expired = new NextResponse();
    expired.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path,
      expires: new Date(0),
      maxAge: 0,
    });
    // Append separate headers: cookies.set on the same response replaces
    // cookies with the same name even when their paths differ.
    response.headers.append("Set-Cookie", expired.headers.get("Set-Cookie")!);
  }
  return response;
}