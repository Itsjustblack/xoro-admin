import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(req: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json({ message: "API URL is not configured" }, { status: 500 })
  }

  const body = await req.text()

  const upstreamRes = await fetch(`${API_BASE_URL}/auth/signup/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  })

  const data = await upstreamRes.json()

  if (!upstreamRes.ok) {
    return NextResponse.json(data, { status: upstreamRes.status })
  }

  const response = NextResponse.json(data, { status: 200 })

  response.cookies.set("auth_token", data.access_token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3600,
    path: "/",
  })

  return response
}
