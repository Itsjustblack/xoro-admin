"use client";

import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { loginUser } from "@/lib/api/v1/auth/actions";
import { type LoginFormValues, loginSchema } from "@/lib/schemas/auth";
import { useAuthActions } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function LoginForm() {
	const router = useRouter();
	const { setLoginCredentials } = useAuthActions();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: registerUser, isPending } = useMutation({
		mutationFn: loginUser,
		onSuccess: () => {
			router.push("/verify-otp");
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		setLoginCredentials(data);
		registerUser(data);
	};

	return (
		<>
			<form
				className="mt-8"
				onSubmit={form.handleSubmit(onSubmit)}
				noValidate
				id="login-form"
			>
				<FieldGroup className="gap-3 sm:gap-4">
					<Controller
						name="email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor="login-email"
									className="text-sm font-semibold text-text-heading font-primary"
								>
									Email Address
								</FieldLabel>
								<Input
									{...field}
									id="login-email"
									type="email"
									placeholder="name@company.com"
									autoComplete="email"
									aria-invalid={fieldState.invalid}
									className="form-input"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					<Controller
						name="password"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor="login-password"
									className="text-sm font-semibold text-text-heading font-primary"
								>
									Password
								</FieldLabel>
								<InputGroup className="form-input">
									<InputGroupInput
										{...field}
										id="login-password"
										type={showPassword ? "text" : "password"}
										placeholder="••••••••"
										autoComplete="current-password"
										className="h-full text-sm text-text-primary placeholder:text-text-muted font-primary"
									/>
									<InputGroupAddon
										align="inline-end"
										className="pr-3"
									>
										<InputGroupButton
											type="button"
											onClick={() => setShowPassword((value) => !value)}
											variant="ghost"
											size="icon-xs"
											className="text-text-muted hover:text-text-secondary"
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? (
												<EyeOff className="size-5" />
											) : (
												<Eye className="size-5" />
											)}
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								<div className="flex">
									<Link
										href="#"
										className="text-sm text-brand-primary-dark font-medium hover-underline ml-auto"
									>
										Forgot password?
									</Link>
								</div>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* <Controller
						name="remember"
						control={form.control}
						render={({ field }) => (
							<Field
								orientation="horizontal"
								className="items-center gap-2.5"
							>
								<Checkbox
									id="login-remember"
									className="rounded-sm data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary *:data-[slot=checkbox-indicator]:text-white!"
									checked={field.value}
									onCheckedChange={(checked) =>
										field.onChange(checked === true)
									}
								/>
								<FieldLabel
									htmlFor="login-remember"
									className="font-primary text-sm font-normal text-text-secondary"
								>
									Keep me logged in for 30 days
								</FieldLabel>
							</Field>
						)}
					/> */}

					<AuthSubmitButton
						idleText="Sign In"
						loadingText="Logging in..."
						isLoading={isPending}
					/>
				</FieldGroup>
			</form>

			<p className="mt-10 text-center text-text-secondary font-primary">
				Don&apos;t have an account?{" "}
				<Link
					href="/sign-up"
					className="text-brand-primary font-bold hover-underline"
				>
					Create an account
				</Link>
			</p>
		</>
	);
}
