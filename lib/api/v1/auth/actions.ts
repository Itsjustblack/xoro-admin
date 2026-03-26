"use server"

import ApiClient, { handleApiError } from "@/lib/api-client"
import { LoginFormValues, SignUpFormValues } from "@/lib/schemas/auth"
import { IUser } from "@/lib/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Define response types
interface AuthResponse {
  status: boolean
  message: string
  access_token: string
  token_type: string
  data: IUser
}

//QUERY FUNCTIONS
export async function getCurrentUser() {
  try {
    const res = await ApiClient.get<IUser>("/get-user")
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

// MUTATION FUNCTIONS
export async function signupUser(payload: SignUpFormValues) {
  try {
    const res = await ApiClient.post("/auth/signup", {
      name: payload.fullName,
      email: payload.email,
      password: payload.password,
    })
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function loginUser(payload: LoginFormValues) {
  try {
    const res = await ApiClient.post("/auth/login", payload)
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function verifyLoginOtp(
  payload: LoginFormValues & { otp: string },
) {
  try {
    const res = await ApiClient.post<AuthResponse>(
      "/auth/login/verify-otp",
      payload,
    )

    const cookieStore = await cookies()
    cookieStore.set("auth_token", res.data.access_token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function verifySignupOtp(
  payload: SignUpFormValues & { otp: string },
) {
  try {
    const res = await ApiClient.post<AuthResponse>("/auth/signup/verify-otp", {
      name: payload.fullName,
      email: payload.email,
      password: payload.password,
      otp: payload.otp,
    })

    const cookieStore = await cookies()
    cookieStore.set("auth_token", res.data.access_token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })

    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function forgotPassword(payload: { email: string }) {
  try {
    const res = await ApiClient.post("/auth/forgot-password", payload)
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function resetPassword(payload: {
  email: string
  new_password: string
  token: string
}) {
  try {
    const res = await ApiClient.post(
      "/auth/forgot-password/verify-reset",
      payload,
    )
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")
  } catch (error) {
    throw handleApiError(error)
  }

  redirect("/login")
}
