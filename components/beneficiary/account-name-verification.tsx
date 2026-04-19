"use client"

import { verifyBankAccount } from "@/lib/api/v1/wallet/queries"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useEffect, useMemo } from "react"

export type AccountVerificationStatus = "idle" | "loading" | "success" | "error"

interface AccountNameVerificationProps {
  bankCode?: string
  accountNumber?: string
  currency?: string
  className?: string
  onStatusChange?: (
    status: AccountVerificationStatus,
    accountName: string | null,
  ) => void
}

function normalizeAccountNumber(value?: string) {
  return (value ?? "").replace(/\D/g, "")
}

export function AccountNameVerification({
  bankCode,
  accountNumber,
  currency = "NGN",
  className,
  onStatusChange,
}: AccountNameVerificationProps) {
  const normalizedBankCode = bankCode?.trim() ?? ""
  const normalizedAccountNumber = normalizeAccountNumber(accountNumber)
  const canVerify =
    normalizedBankCode.length > 0 && normalizedAccountNumber.length === 10

  const verificationQuery = useQuery({
    queryKey: [
      "beneficiary-account-verification",
      normalizedBankCode,
      normalizedAccountNumber,
      currency,
    ],
    queryFn: () =>
      verifyBankAccount({
        account: normalizedAccountNumber,
        bank: normalizedBankCode,
        currency: "NGN",
      }),
    enabled: canVerify,
    retry: false,
  })

  const accountName = useMemo(() => {
    const resolvedName = verificationQuery.data?.account_name?.trim()
    return resolvedName ? resolvedName : null
  }, [verificationQuery.data])

  const status: AccountVerificationStatus = useMemo(() => {
    if (!canVerify) return "idle"
    if (verificationQuery.isPending || verificationQuery.isFetching)
      return "loading"
    if (verificationQuery.isError) return "error"
    if (accountName) return "success"
    return "error"
  }, [
    accountName,
    canVerify,
    verificationQuery.isError,
    verificationQuery.isFetching,
    verificationQuery.isPending,
  ])

  const errorMessage = useMemo(() => {
    if (verificationQuery.isError) {
      return getApiErrorMessage(
        verificationQuery.error,
        "Account not found. Check bank and account number.",
      )
    }

    return "Account not found. Check bank and account number."
  }, [verificationQuery.error, verificationQuery.isError])

  useEffect(() => {
    if (!onStatusChange) return
    onStatusChange(status, status === "success" ? accountName : null)
  }, [accountName, onStatusChange, status])

  if (status === "idle") {
    return null
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-semibold text-text-subtitle">Account Name</p>

      {status === "loading" ? (
        <div className="flex h-11.5 items-center gap-2 rounded-lg border border-border-light bg-surface-1 px-4 text-sm text-text-secondary">
          <Loader2 className="size-4 animate-spin" />
          <span>Verifying account details...</span>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="flex h-11.5 items-center justify-between rounded-lg border border-green-500/70 bg-white px-4">
          <span className="truncate font-manrope font-medium leading-none tracking-[0.01em] text-text-primary">
            {accountName}
          </span>
          <CheckCircle2 className="size-6 shrink-0 text-green-500" />
        </div>
      ) : null}

      {status === "error" ? (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </div>
  )
}
