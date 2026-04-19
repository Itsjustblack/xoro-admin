"use client"

import { getUserInfo } from "@/lib/api/v1/user/queries"
import { userQueryKeys } from "@/lib/api/v1/query-key-factory"
import { useAuthActions } from "@/store/auth"
import {
  useCurrentMerchant,
  useCurrentMode,
  useMerchantActions,
} from "@/store/merchant"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function InitializeApp({ children }: { children: ReactNode }) {
  const { setUser } = useAuthActions()
  const { setMerchants } = useMerchantActions()
  const currentMerchant = useCurrentMerchant()
  const mode = useCurrentMode()
  const router = useRouter()

  const { data: user, isPending, isError } = useQuery({
    queryKey: userQueryKeys.current,
    queryFn: getUserInfo,
    retry: false,
  })

  useEffect(() => {
    if (!user) return
    setUser(user)
    setMerchants(user.merchants)
    if (!user.merchants.length) {
      router.replace("/merchant")
    }
  }, [user, setUser, setMerchants, router])

  useEffect(() => {
    if (isPending || user) return
    if (isError) {
      router.replace("/login")
    }
  }, [isError, isPending, router, user])

  useEffect(() => {
    document.cookie = currentMerchant?.id
      ? `current_merchant_id=${currentMerchant.id}; path=/; samesite=lax`
      : "current_merchant_id=; path=/; max-age=0; samesite=lax"
  }, [currentMerchant?.id])

  useEffect(() => {
    document.cookie = `dashboard_mode=${mode}; path=/; samesite=lax`
  }, [mode])

  if (isPending || isError || !user) {
    return null
  }

  return <>{children}</>
}
