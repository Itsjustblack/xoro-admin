"use client"

import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createNewMerchant } from "@/lib/api/v1/merchant/actions"
import {
  merchantQueryKeys,
  userQueryKeys,
} from "@/lib/api/v1/query-key-factory"
import { merchantSchema, type MerchantFormValues } from "@/lib/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleHelp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Shield } from "../icons"

export function CreateMerchantForm() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useForm<MerchantFormValues>({
    resolver: zodResolver(merchantSchema),
    defaultValues: {
      merchantName: "",
      email: "",
    },
  })

  const { mutate: createMerchant, isPending } = useMutation({
    mutationFn: createNewMerchant,
    onSuccess: () => {
      toast.success("Merchant Created Successfully")
      queryClient.invalidateQueries({
        queryKey: merchantQueryKeys.all,
      })
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.current,
      })
      router.push("/dashboard")
    },
  })

  function onSubmit(data: MerchantFormValues) {
    createMerchant({
      name: data.merchantName,
      email: data.email,
    })
    form.reset()
  }

  return (
    <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Controller
          name="merchantName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="merchantName"
                className="text-sm font-semibold text-text-heading font-primary"
              >
                Merchant Name
              </FieldLabel>
              <Input
                {...field}
                id="merchantName"
                type="text"
                placeholder="Enter your business or merchant name"
                aria-invalid={fieldState.invalid}
                className="form-input"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="email"
                className="text-sm font-semibold text-text-heading font-primary block"
              >
                Email Address
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                className="form-input"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-8">
        <AuthSubmitButton
          idleText="Continue"
          loadingText="Creating merchant..."
          isLoading={isPending}
        ></AuthSubmitButton>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <Link
          href="#"
          className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-2 font-primary"
        >
          <CircleHelp className="h-4 w-4" />
          Help Center
        </Link>
        <Link
          href="#"
          className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-2 font-primary"
        >
          <Shield className="h-4 w-4" />
          Security Policy
        </Link>
      </div>
    </form>
  )
}
