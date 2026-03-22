import apiClient, { handleApiError } from "@/lib/axios";
import { LoginFormValues, SignUpFormValues } from "@/lib/schemas/auth";
import { IUser, LoginCredentials, SignupCredentials } from "@/lib/types";

// Define response types
interface AuthResponse {
  user: IUser;
  access_token: string;
}

interface MessageResponse {
  message: string;
}

export async function signupUser(payload: SignUpFormValues): Promise<MessageResponse> {
  try {
    const res = await apiClient.post<MessageResponse>("/auth/signup", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function loginUser(payload: LoginFormValues): Promise<{
  message: string;
  requiresOtp: boolean;
  email?: string;
}> {
  try {
    const res = await apiClient.post("/auth/login", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function verifyLoginOtp(
  payload: LoginCredentials & { otp: string }
): Promise<AuthResponse> {
  try {
    const res = await apiClient.post<AuthResponse>("/auth/verify-login-otp", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function verifySignupOtp(
  payload: SignupCredentials & { otp: string }
): Promise<AuthResponse> {
  try {
    const res = await apiClient.post<AuthResponse>("/auth/verify-signup-otp", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function forgotPassword(payload: { email: string }): Promise<MessageResponse> {
  try {
    const res = await apiClient.post<MessageResponse>("/auth/forgot-password", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function resetPassword(payload: {
  email: string;
  new_password: string;
  token: string;
}): Promise<MessageResponse> {
  try {
    const res = await apiClient.post<MessageResponse>("/auth/forgot-password/verify-reset", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function logoutUser(): Promise<MessageResponse> {
  try {
    const res = await apiClient.post<MessageResponse>("/auth/logout");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getCurrentUser(): Promise<IUser> {
  try {
    const res = await apiClient.get<{ user: IUser }>("/auth/me");
    return res.data.user;
  } catch (error) {
    throw handleApiError(error);
  }
}