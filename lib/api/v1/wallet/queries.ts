import ApiClient from "@/lib/api-client"
import { mockWallets, mockWalletSummary } from "@/lib/mock-data"
import { isMockDataMode } from "@/lib/mock-mode"
import { Mode, Wallet, WalletBalanceSummary } from "@/lib/types"

export async function getAllWallets(merchant_id: string, mode: Mode) {
  if (isMockDataMode()) {
    return mockWallets.map((wallet) => ({ ...wallet, merchant_id, mode }))
  }

  const res = await ApiClient.get<Wallet[]>("/wallets", {
    params: { merchant_id, mode },
  })
  return res.data
}

export async function getWalletById(wallet_id: string) {
  if (isMockDataMode()) {
    return mockWallets.find((wallet) => String(wallet.id) === wallet_id) ?? mockWallets[0]
  }

  const res = await ApiClient.get<Wallet>(`/wallets/${wallet_id}`)
  return res.data
}

export async function getWalletBalanceSummary(merchant_id: string, mode: Mode) {
  if (isMockDataMode()) {
    return mockWalletSummary
  }

  const res = await ApiClient.get<WalletBalanceSummary>(
    "/wallets/balance/summary",
    {
      params: { merchant_id, mode },
    },
  )
  return res.data
}
