import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/config/db";
import {
  CreateUserRequest,
} from "@/app/types/user";

// GET /api/users
export async function GET() {
  try {
    const [rows] = await pool.execute(`
      SELECT
        id,
        name,
        email,
        phone,
        type,
        status,
        created_at,
        updated_at
      FROM users
      ORDER BY id DESC
    `);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json();

    const {
      name,
      email,
      phone,
      password,
      type = "user",
      status = 1,
    } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check duplicate email
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const [result]: any = await pool.execute(
      `
        INSERT INTO users
        (
          name,
          email,
          phone,
          password,
          type,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        email,
        phone || null,
        password,
        type,
        status,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        id: result.insertId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}