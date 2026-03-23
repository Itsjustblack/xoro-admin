"use server";

import ApiClient, { handleApiError } from "@/lib/api-client";
import { LoginFormValues, SignUpFormValues } from "@/lib/schemas/auth";
import { IUser } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define response types
interface AuthResponse {
	user: IUser;
	access_token: string;
}

//QUERY FUNCTIONS
export async function getCurrentUser() {
	try {
		const res = await ApiClient.get<{ user: IUser }>("/auth/me");
		return res.data.user;
	} catch (error) {
		throw handleApiError(error);
	}
}

// MUTATION FUNCTIONS
export async function signupUser(payload: SignUpFormValues) {
	try {
		const res = await ApiClient.post("/auth/signup", payload);
		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function loginUser(payload: LoginFormValues) {
	try {
		const res = await ApiClient.post("/auth/login", payload);
		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function verifyLoginOtp(
	payload: LoginFormValues & { otp: string },
) {
	try {
		const res = await ApiClient.post<AuthResponse>(
			"/auth/login/verify-otp",
			payload,
		);

		const cookieStore = await cookies();
		cookieStore.set("auth_token", res.data.access_token, {
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 3600,
			path: "/",
		});

		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function verifySignupOtp(
	payload: SignUpFormValues & { otp: string },
) {
	try {
		const res = await ApiClient.post<AuthResponse>(
			"/auth/signup/verify-otp",
			payload,
		);

		const cookieStore = await cookies();
		cookieStore.set("auth_token", res.data.access_token, {
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 3600,
			path: "/",
		});

		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function forgotPassword(payload: { email: string }) {
	try {
		const res = await ApiClient.post("/auth/forgot-password", payload);
		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function resetPassword(payload: {
	email: string;
	new_password: string;
	token: string;
}) {
	try {
		const res = await ApiClient.post(
			"/auth/forgot-password/verify-reset",
			payload,
		);
		return res.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function logoutUser() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("auth_token");
	} catch (error) {
		throw handleApiError(error);
	}

	redirect("/login");
}
