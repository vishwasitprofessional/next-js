import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { ResultSetHeader } from "mysql2";
import pool from "@/app/config/db";
import { hashResetToken } from "@/app/lib/password-reset";

export async function POST(request: Request) {
  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }
  const { token, password, confirmPassword } = body || {};
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) {
    return NextResponse.json({ success: false, message: "Invalid reset link. Request a new one." }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 6 || Buffer.byteLength(password, "utf8") > 72 || password !== confirmPassword) {
    return NextResponse.json({ success: false, message: "Passwords must match and contain at least 6 characters and at most 72 bytes." }, { status: 400 });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    // A single atomic update consumes the token and changes the password.
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE users u JOIN password_resets r ON r.user_id = u.id
       SET u.password = ?, r.token_hash = NULL
       WHERE r.token_hash = ? AND r.expires_at > UTC_TIMESTAMP() AND u.status = 1`,
      [passwordHash, hashResetToken(token)],
    );
    if (!result.affectedRows) {
      return NextResponse.json({ success: false, message: "This reset link is expired or has already been used. Request a new one." }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Your password has been changed. You can now log in." });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to reset your password. Please try again later." }, { status: 503 });
  }
}
