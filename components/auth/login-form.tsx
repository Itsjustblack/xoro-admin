"use client";

import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { type LoginFormValues, loginSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast("Login submitted", {
      description: data.email,
      position: "bottom-right",
    });
  };

  return (
    <>
      <form
        className="mt-8"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        id="login-form"
      >
        <FieldGroup className="gap-6">
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
                <div className="flex justify-between">
                  <FieldLabel
                    htmlFor="login-password"
                    className="text-sm font-semibold text-text-heading font-primary"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    href="#"
                    className="text-sm text-brand-primary-dark font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <InputGroup className="form-input">
                  <InputGroupInput
                    {...field}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    className="h-12 text-sm  text-text-primary placeholder:text-text-muted font-primary"
                  />
                  <InputGroupAddon align="inline-end" className="pr-3">
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
            name="remember"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal" className="items-center gap-2.5">
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
          />

          <AuthSubmitButton
            idleText="Sign In"
            loadingText="Logging in..."
            isLoading={form.formState.isSubmitting}
          />
        </FieldGroup>
      </form>

      <p className="mt-10 text-center text-text-secondary font-primary">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-brand-primary font-bold hover:underline"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-8 border-t border-surface-3 pt-8 flex items-center justify-center gap-2 text-text-muted">
        <LockKeyhole className="size-3.5" />
        <span className="text-xs tracking-widest uppercase font-medium">
          Secure SSL Encrypted Connection
        </span>
      </div>
    </>
  );
}
