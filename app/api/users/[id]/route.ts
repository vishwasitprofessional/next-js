import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/config/db";
import { UpdateUserRequest } from "@/app/types/user";

// GET /api/users/1
export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const [rows]: any = await pool.execute(
      `
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
        WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      {
        status: 500,
      }
    );
  }
}

// PUT /api/users/1
export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const body: UpdateUserRequest = await request.json();

    const {
      name,
      email,
      phone,
      password,
      type = "user",
      status = 1,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check user
    const [users]: any = await pool.execute(
      "SELECT id FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check duplicate email
    const [emailUsers]: any = await pool.execute(
      `
        SELECT id
        FROM users
        WHERE email = ?
        AND id != ?
      `,
      [email, id]
    );

    if (emailUsers.length > 0) {
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

    if (password) {
      await pool.execute(
        `
          UPDATE users
          SET
            name = ?,
            email = ?,
            phone = ?,
            password = ?,
            type = ?,
            status = ?
          WHERE id = ?
        `,
        [
          name,
          email,
          phone || null,
          password,
          type,
          status,
          id,
        ]
      );
    } else {
      await pool.execute(
        `
          UPDATE users
          SET
            name = ?,
            email = ?,
            phone = ?,
            type = ?,
            status = ?
          WHERE id = ?
        `,
        [
          name,
          email,
          phone || null,
          type,
          status,
          id,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE /api/users/1
export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const [result]: any = await pool.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      {
        status: 500,
      }
    );
  }
}