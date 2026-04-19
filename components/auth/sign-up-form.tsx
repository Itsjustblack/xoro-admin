"use client"

import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { signupUser } from "@/lib/api/v1/auth/actions"
import { signUpSchema, type SignUpFormValues } from "@/lib/schemas/auth"
import { useAuthActions } from "@/store/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export function SignUpForm() {
  const router = useRouter()
  const { setSignupCredentials } = useAuthActions()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      router.push("/verify-otp")
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    registerUser(data)
    setSignupCredentials(data)
  }

  return (
    <>
      <form
        className="mt-5"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        id="signup-form"
      >
        <FieldGroup className="gap-3 sm:gap-5">
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="signup-full-name"
                  className="text-sm font-semibold text-text-heading font-primary"
                >
                  Full Name
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-full-name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="signup-email"
                  className="text-sm font-semibold text-text-heading font-primary"
                >
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id="signup-email"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="signup-password"
                    className="text-sm font-semibold text-text-heading font-primary"
                  >
                    Password
                  </FieldLabel>
                  <InputGroup className="form-input">
                    <InputGroupInput
                      {...field}
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="h-full text-sm text-text-primary placeholder:text-text-muted font-primary"
                    />
                    <InputGroupAddon align="inline-end">
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="signup-confirm-password"
                    className="text-sm font-semibold text-text-heading font-primary"
                  >
                    Confirm Password
                  </FieldLabel>
                  <InputGroup className="form-input">
                    <InputGroupInput
                      {...field}
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="h-full text-sm text-text-primary placeholder:text-text-muted font-primary"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        variant="ghost"
                        size="icon-xs"
                        className="text-text-muted hover:text-text-secondary"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <AuthSubmitButton
            idleText="Create account"
            loadingText="Creating account..."
            isLoading={isPending}
          />
        </FieldGroup>
      </form>

      <p className="mt-8 text-center text-text-secondary font-primary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand-primary font-semibold hover-underline"
        >
          Log in
        </Link>
      </p>
    </>
  )
}
