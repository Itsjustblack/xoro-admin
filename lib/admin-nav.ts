import {
  CalendarRefreshIcon,
  EmailArrowIcon,
  FileTextIcon,
  RefreshClock,
  SettingIcon,
  UserCardIcon,
  Wallet,
} from "@/components/icons"
import { ArrowDownLeft, ArrowUpRight, LayoutGrid, Link2 } from "lucide-react"

export const NAV = [
  {
    section: "HOME",
    items: [
      { label: "Home", icon: LayoutGrid, id: "dashboard", href: "/dashboard" },
    ],
  },
  {
    section: "BALANCE",
    items: [
      { label: "Balance", icon: Wallet, id: "balance", href: "/balance" },
    ],
  },
  {
    section: "TOOLS",
    items: [
      {
        label: "Beneficiaries",
        icon: UserCardIcon,
        id: "beneficiaries",
        href: "/beneficiaries",
      },
      {
        label: "Bulk Payouts",
        icon: EmailArrowIcon,
        id: "bulk-payouts",
        href: "/bulk-payouts",
      },
      {
        label: "Checkout Links",
        icon: Link2,
        id: "checkout-links",
        href: "/checkout-links",
      },
      {
        label: "Subscriptions",
        icon: CalendarRefreshIcon,
        id: "subscriptions",
        href: "/subscriptions",
      },
    ],
  },
  {
    section: "TRANSACTIONS",
    items: [
      {
        label: "Pay-Ins",
        icon: ArrowDownLeft,
        id: "pay-ins",
        href: "/pay-ins",
      },
      {
        label: "Pay-Outs",
        icon: ArrowUpRight,
        id: "pay-outs",
        href: "/pay-outs",
      },
      { label: "Refunds", icon: RefreshClock, id: "refunds", href: "/refunds" },
    ],
  },
  {
    section: "ACCOUNT",
    items: [
      {
        label: "Documentation",
        icon: FileTextIcon,
        id: "documentation",
        href: "/documentation",
      },
      {
        label: "Settings",
        icon: SettingIcon,
        id: "settings",
        href: "/settings",
      },
    ],
  },
]
