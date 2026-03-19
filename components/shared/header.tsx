"use client";

import { NAV } from "@/lib/admin-nav";
import { usePathname } from "next/navigation";
import { BellIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import EnvironmentToggle from "./environment-toggle";

const Header = () => {
  const pathname = usePathname();
  const currentPage = NAV.flatMap((section) => section.items).find((item) =>
    pathname.startsWith(item.href),
  )?.label;

  return (
    <div className="px-8 sticky top-0 left-0 right-0 h-16 w-full border-b border-b-brand-primary-dark/10 flex items-center bg-surface-1 z-50">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-text-subtitle" />
          <span className="font-bold text-surface-dark">{currentPage}</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <EnvironmentToggle />
          <div className="bg-brand-primary-dark/10 h-6 w-px" />
          <button className="flex items-center justify-center">
            <BellIcon className="size-5 text-text-subtitle" />
          </button>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  );
};

export default Header;
