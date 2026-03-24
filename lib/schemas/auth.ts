import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("Enter a valid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z
	.object({
		fullName: z.string().min(2, "Full name must be at least 2 characters"),
		email: z.email("Enter a valid email"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Password must be at least 8 characters"),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const verifySchema = z.object({
	otp: z
		.string()
		.length(6, "Code must be 6 digits")
		.regex(/^\d+$/, "Code must contain only numbers"),
});

export const merchantSchema = z.object({
	merchantName: z
		.string()
		.min(2, "Merchant name must be at least 2 characters"),
	email: z.email("Enter a valid email address"),
});

export type VerifyFormValues = z.infer<typeof verifySchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type MerchantFormValues = z.infer<typeof merchantSchema>;
