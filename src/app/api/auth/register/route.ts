import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, phone, userType, address } = body

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Insert user into database
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password_hash: passwordHash,
          first_name: firstName,
          last_name: lastName,
          phone,
          user_type: userType,
          address,
          is_verified: false,
          is_active: true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Registration error:", error)
      return NextResponse.json({ error: "Failed to create account" }, { status: 400 })
    }

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = data

    return NextResponse.json({
      message: "Account created successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
