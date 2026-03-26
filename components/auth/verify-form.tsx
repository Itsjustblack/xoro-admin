"use client"

import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useCountdown } from "@/hooks/use-count-down"
import { verifyLoginOtp, verifySignupOtp } from "@/lib/api/v1/auth/actions"
import { verifySchema, type VerifyFormValues } from "@/lib/schemas/auth"
import { maskEmail } from "@/lib/utils"
import {
  useAuthActions,
  useLoginCredentials,
  useSignupCredentials,
} from "@/store/auth"
import { useMerchantActions } from "@/store/merchant"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CircleHelp, Timer } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Shield } from "../icons"

type VerifyFormProps = {
  email: string
}

export function VerifyForm({ email }: VerifyFormProps) {
  const router = useRouter()
  const signupCredentials = useSignupCredentials()
  const loginCredentials = useLoginCredentials()

  const { clearCredentials } = useAuthActions()
  const { setMerchants } = useMerchantActions()
  const {
    secondsLeft: secondsRemaining,
    minutes: countdownMinutes,
    seconds: countdownSeconds,
    reset: resetCountdown,
  } = useCountdown(60)

  const maskedEmail = useMemo(() => maskEmail(email), [email])

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  })

  const resolvePostLoginRoute = (data: {
    data?: {
      merchant?: unknown
      merchants?: unknown[]
    }
  }) => {
    const hasMerchant =
      Boolean(data.data?.merchant) ||
      (Array.isArray(data.data?.merchants) && data.data.merchants.length > 0)

    return hasMerchant ? "/dashboard" : "/merchant"
  }

  const {
    mutate: login,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: verifyLoginOtp,
    onSuccess: (data) => {
      // Initialize merchant store with merchants from auth response
      if (data.data?.merchants && data.data.merchants.length > 0) {
        setMerchants(data.data.merchants)
      }
      router.replace(resolvePostLoginRoute(data))
      toast.success("OTP verified successfully")
    },
  })

  const {
    mutate: signUp,
    isPending: isSignupPending,
    isSuccess: isSignupSuccess,
  } = useMutation({
    mutationFn: verifySignupOtp,
    onSuccess: () => {
      toast.success("OTP verified successfully")
      router.replace("/merchant")
    },
  })

  useEffect(() => {
    if (
      !loginCredentials &&
      !signupCredentials &&
      !isLoginSuccess &&
      !isSignupSuccess
    ) {
      router.replace("/login")
    }
  }, [
    isLoginSuccess,
    isSignupSuccess,
    loginCredentials,
    router,
    signupCredentials,
  ])

  useEffect(() => {
    if (isLoginSuccess || isSignupSuccess) {
      clearCredentials()
    }
  }, [clearCredentials, isLoginSuccess, isSignupSuccess])

  const onSubmit = (data: VerifyFormValues) => {
    if (loginCredentials) {
      login({
        ...loginCredentials,
        otp: data.otp,
      })
      return
    }

    if (signupCredentials) {
      signUp({
        ...signupCredentials,
        otp: data.otp,
      })
      return
    }
  }

  const handleResend = () => {
    resetCountdown()
    form.reset({ otp: "" })
    toast("Verification code resent", {
      description: email || "Please check your inbox",
      position: "bottom-right",
    })
  }

  return (
    <>
      <p className="mt-4 text-text-secondary font-primary">
        {email
          ? `Enter the 6-digit code sent to ${maskedEmail || email}. Please enter it below to ensure it's you`
          : "Enter the 6-digit code sent to your email address. Please enter it below to ensure its you"}
      </p>

      <form
        className="mt-10"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        id="verify-form"
      >
        <FieldGroup className="gap-8">
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputOTP
                  id="verify-otp"
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  containerClassName="w-full"
                >
                  <InputOTPGroup className="w-full justify-between sm:justify-start gap-2 sm:gap-[22.4px]">
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 flex-1 rounded-xl! border-2! border-surface-border bg-surface-card text-base text-text-primary sm:h-16 sm:w-14 sm:flex-none"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <AuthSubmitButton
            idleText="Verify account"
            loadingText="Verifying..."
            isLoading={isLoginPending || isSignupPending}
            showArrow={false}
          />
        </FieldGroup>
      </form>

      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-primary">
        <div className="flex items-center gap-2 text-text-secondary">
          <Timer className="size-4" />
          <span>{`Resend in ${countdownMinutes.toString().padStart(2, "0")}:${countdownSeconds.toString().padStart(2, "0")}`}</span>
        </div>

        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-brand-primary font-semibold"
          onClick={handleResend}
          disabled={secondsRemaining > 0}
        >
          Resend code
        </Button>
      </div>

      {/* <p className="mt-4 text-center text-sm text-text-secondary font-primary">
        Wrong email?{" "}
        <Link
          href="/sign-up"
          className="text-brand-primary font-semibold hover:underline"
        >
          Go back
        </Link>
      </p> */}

      <div className="mt-18 flex items-center justify-center gap-6 text-sm font-primary text-text-muted">
        <Link
          href="#"
          className="inline-flex items-center gap-1.5 hover:text-brand-primary"
        >
          <CircleHelp className="size-4" />
          Help Center
        </Link>
        <Link
          href="#"
          className="inline-flex items-center gap-1.5 hover:text-brand-primary"
        >
          <Shield className="size-4" />
          Security Policy
        </Link>
      </div>
    </>
  )
}
