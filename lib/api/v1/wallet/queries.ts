import ApiClient from "@/lib/api-client"
import { KoraPayload, Mode, Wallet, WalletBalanceSummary } from "@/lib/types"

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

export async function verifyBankAccount(payload: KoraPayload) {
  const res = await ApiClient.post<{
    data: {
      bank_name: string
      bank_code: string
      account_number: string
      account_name: string
    }
  }>("/kora/banks/resolve", payload)

  return res.data.data
}
