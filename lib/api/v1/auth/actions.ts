import ApiClient from "@/lib/api-client"
import { LoginFormValues, SignUpFormValues } from "@/lib/schemas/auth"
import { IUser } from "@/lib/types"

export interface AuthResponse {
  status: boolean
  message: string
  access_token: string
  token_type: string
  data: IUser
}

export async function signupUser(payload: SignUpFormValues) {
  const res = await ApiClient.post("/auth/signup", {
    name: payload.fullName,
    email: payload.email,
    password: payload.password,
  })
  return res.data
}

export async function loginUser(payload: LoginFormValues) {
  const res = await ApiClient.post("/auth/login", payload)
  console.log("Login response:", res.data)
  return res.data
}

export async function verifyLoginOtp(
  payload: LoginFormValues & { otp: string },
) {
  const res = await ApiClient.post<AuthResponse>("/auth/login/verify-otp", payload)
  return res.data
}

export async function verifySignupOtp(
  payload: SignUpFormValues & { otp: string },
) {
  const res = await ApiClient.post<AuthResponse>("/auth/signup/verify-otp", {
    name: payload.fullName,
    email: payload.email,
    password: payload.password,
    otp: payload.otp,
  })
  return res.data
}

export async function forgotPassword(payload: { email: string }) {
  const res = await ApiClient.post("/auth/forgot-password", payload)
  return res.data
}

export async function resetPassword(payload: {
  email: string
  new_password: string
  token: string
}) {
  const res = await ApiClient.post("/auth/forgot-password/verify-reset", payload)
  return res.data
}

export async function logoutUser() {
  const res = await ApiClient.post("/auth/logout")
  return res.data
}
