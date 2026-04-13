import { BitcoinIcon2, Wallet } from "@/components/icons"
import { Landmark, Smartphone } from "lucide-react"

export const PAGE_SIZE = 10

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50] as const

export const CRYPTO_CURRENCIES = ["BTC", "ETH", "USDT"] as const

export const PAYMENT_METHODS = [
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: Landmark,
  },
  {
    id: "mobile_money",
    label: "Mobile Money",
    icon: Smartphone,
  },
  { id: "crypto", label: "Crypto", icon: BitcoinIcon2 },
  { id: "wallet", label: "Wallet", icon: Wallet },
] as const