import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/app/config/db";
import { createToken, getSessionMaxAge } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;
    const rememberMe = body.rememberMe === true;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.execute(
      `
        SELECT
          id,
          name,
          email,
          password,
          type,
          status
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const user = rows[0];

    if (user.status !== 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is inactive",
        },
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    if (user.type !== "admin" && user.type !== "user") {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is not allowed to sign in. Please contact the administrator.",
        },
        { status: 403 }
      );
    }

    // Create JWT
    const token = await createToken({
      id: user.id,
      email: user.email,
      type: user.type,
    }, rememberMe);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });

    // HTTP-only authentication cookie
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: process.env.NEXT_PUBLIC_SUB_FOLDER || "/",
      maxAge: getSessionMaxAge(rememberMe),
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
