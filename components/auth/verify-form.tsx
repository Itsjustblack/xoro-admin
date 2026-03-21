"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelp, Timer } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySchema, type VerifyFormValues } from "@/lib/schemas/auth";
import { Shield } from "../icons";

type VerifyFormProps = {
  email: string;
};

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "";
  if (name.length <= 2) return `${name[0] ?? ""}*@${domain}`;
  return `${name[0]}${"*".repeat(Math.max(1, name.length - 2))}${name[name.length - 1]}@${domain}`;
}

export function VerifyForm({ email }: VerifyFormProps) {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const maskedEmail = useMemo(() => maskEmail(email), [email]);
  const countdownLabel = useMemo(() => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `Resend in ${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [secondsRemaining]);

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [secondsRemaining]);

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast("Account verified", {
      description: email || "Verification successful",
      position: "bottom-right",
    });
    router.push("/");
  };

  const handleResend = () => {
    setSecondsRemaining(60);
    form.reset({ otp: "" });
    toast("Verification code resent", {
      description: email || "Please check your inbox",
      position: "bottom-right",
    });
  };

  return (
    <>
      <p className="mt-4 text-text-secondary font-primary">
        {email
          ? `Enter the 6-digit code sent to ${maskedEmail || email}. Please enter it below to ensure its you`
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
                        className="flex-1 h-12 sm:flex-none sm:h-16 sm:w-14 rounded-xl! bg-surface-1 border-2! text-text-primary border-surface-6 text-base"
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
            isLoading={form.formState.isSubmitting}
            showArrow={false}
          />
        </FieldGroup>
      </form>

      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-primary">
        <div className="flex items-center gap-2 text-text-secondary">
          <Timer className="size-4" />
          <span>{countdownLabel}</span>
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
  );
}
