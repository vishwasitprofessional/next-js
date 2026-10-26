import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import pool from "@/app/config/db";
import { hashResetToken, newResetToken, resetEmailConfig, sendResetEmail, ResetEmailError } from "@/app/lib/password-reset";

export const runtime = "nodejs";

const accepted = () => NextResponse.json({ success: true, message: "If an active account exists for this email, a password reset link will be sent. Check your inbox and spam folder." });

export async function POST(request: Request) {
  let body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Enter a valid email address." }, { status: 400 });
  }
  try {
    resetEmailConfig();
    const connection = await pool.getConnection();
    const token = newResetToken();
    const hash = hashResetToken(token);
    let userId;
    let recipient = email;
    try {
      await connection.beginTransaction();
      // Serialize requests for the same account, including its first request.
      const [users] = await connection.execute<RowDataPacket[]>("SELECT id, email FROM users WHERE email = ? AND status = 1 LIMIT 1 FOR UPDATE", [email]);
      if (!users.length) { await connection.rollback(); return accepted(); }
      userId = users[0].id;
      recipient = users[0].email;
      const [recent] = await connection.execute<RowDataPacket[]>("SELECT user_id FROM password_resets WHERE user_id = ? AND requested_at > DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 MINUTE)", [userId]);
      if (recent.length) { await connection.rollback(); return accepted(); }
      await connection.execute(
        "INSERT INTO password_resets (user_id, token_hash, expires_at, requested_at) VALUES (?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL 30 MINUTE), UTC_TIMESTAMP()) ON DUPLICATE KEY UPDATE token_hash = VALUES(token_hash), expires_at = VALUES(expires_at), requested_at = VALUES(requested_at)",
        [userId, hash],
      );
      await connection.commit();
    } catch (error) { await connection.rollback(); throw error; }
    finally { connection.release(); }
    try {
      await sendResetEmail(recipient, token);
    } catch (error) {
      // Do not reveal account existence or log the token/provider payload.
      console.error("Password reset email delivery failed.", error instanceof ResetEmailError
        ? { provider: "SMTP", code: error.code, reason: error.reason }
        : { reason: "Email request failed or timed out; check network connectivity and SMTP server availability" });
      await pool.execute("UPDATE password_resets SET token_hash = NULL WHERE user_id = ? AND token_hash = ?", [userId, hash]);
    }
    return accepted();
  } catch {
    return NextResponse.json({ success: false, message: "Password reset is temporarily unavailable. Please try again later." }, { status: 503 });
  }
}
