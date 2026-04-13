import ApiClient from "@/lib/api-client"
import { Mode, Wallet, WalletBalanceSummary } from "@/lib/types"

export async function getAllWallets(merchant_id: string, mode: Mode) {
  const res = await ApiClient.get<Wallet[]>("/wallets", {
    params: { merchant_id, mode },
  })
  return res.data
}

export async function getWalletById(wallet_id: string) {
  const res = await ApiClient.get<Wallet>(`/wallets/${wallet_id}`)
  return res.data
}

export async function getWalletBalanceSummary(merchant_id: string, mode: Mode) {
  const res = await ApiClient.get<WalletBalanceSummary>(
    "/wallets/balance/summary",
    {
      params: { merchant_id, mode },
    },
  )
  return res.data
}
