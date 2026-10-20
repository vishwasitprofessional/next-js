import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import pool from "@/app/config/db";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }
  const { name, email, phone, password } = body || {};
  if (typeof name !== "string" || !name.trim() || name.trim().length > 100 ||
      typeof email !== "string" || email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof password !== "string" || password.length < 6 || Buffer.byteLength(password, "utf8") > 72 ||
      (phone != null && (typeof phone !== "string" || phone.trim().length > 20))) {
    return NextResponse.json({ success: false, message: "Provide a valid name, email, optional phone, and password (at least 6 characters, at most 72 bytes)." }, { status: 400 });
  }
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const [existing] = await pool.execute<RowDataPacket[]>("SELECT id FROM users WHERE email = ? LIMIT 1", [normalizedEmail]);
    if (existing.length) {
      return NextResponse.json({ success: false, message: "An account with this email already exists. Please sign in." }, { status: 409 });
    }
    const hash = await bcrypt.hash(password, 12);
    await pool.execute(
      "INSERT INTO users (name, email, phone, password, type, status) VALUES (?, ?, ?, ?, 'user', 1)",
      [name.trim(), normalizedEmail, phone?.trim() || null, hash],
    );
    return NextResponse.json({ success: true, message: "Account created. Please sign in." }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ success: false, message: "An account with this email already exists. Please sign in." }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: "Unable to create account. Please try again." }, { status: 500 });
  }
}
