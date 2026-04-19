"use client"

import { NAV } from "@/lib/admin-nav"
import { useUser } from "@/store/auth"
import { usePathname } from "next/navigation"
import { BellIcon } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"
import EnvironmentToggle from "./environment-toggle"

const Header = () => {
  const pathname = usePathname()
  const user = useUser()
  const navItem = NAV.flatMap((section) => section.items).find((item) =>
    pathname.startsWith(item.href),
  )

  const currentPage = pathname.startsWith("/balance")
    ? "Balance Overview"
    : navItem?.label
  const initials =
    user?.name
      ?.split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "XP"

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex h-16 w-full items-center border-b border-b-brand-primary-dark/10 bg-surface-1 px-4 lg:px-6 xl:px-8">
      <header className="flex w-full items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <SidebarTrigger className="text-text-subtitle shrink-0" />
          <span className="truncate font-bold text-surface-dark">
            {currentPage}
          </span>
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0">
          <EnvironmentToggle />
          <div className="bg-brand-primary-dark/10 h-6 w-px" />
          <button className="flex items-center justify-center">
            <BellIcon className="size-5 text-text-subtitle" />
          </button>
          <Avatar>
            <AvatarImage src="" alt={user?.name ?? "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  )
}

export default Header
