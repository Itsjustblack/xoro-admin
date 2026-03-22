import { z } from "zod";

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must not exceed 100 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character",
  );

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: passwordValidation,
  remember: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.email("Enter a valid email"),
    password: passwordValidation,
    confirmPassword: passwordValidation,
    terms: z.boolean().refine((value) => value, {
      message: "You must agree to the Terms of Service and Privacy Policy",
    }),
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
