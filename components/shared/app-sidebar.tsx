"use client";

import { NAV } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Headset } from "../icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const AppSidebar = () => {
  const pathname = usePathname();
  const active = pathname.split("/")[1];

  return (
    <Sidebar className="border-r-brand-primary-dark/10">
      <SidebarHeader className="p-0">
        <div className="p-6 flex flex-col gap-1">
          <span className="font-bold text-xl text-brand-primary-dark">
            XoroPay
          </span>
          <span className="tracking-widest text-brand-primary-dark/60 font-medium text-xs">
            MERCHANT DASHBOARD
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        {NAV.map((nav) => (
          <SidebarGroup key={nav.section} className="px-0">
            <SidebarGroupLabel className="uppercase text-text-muted font-bold text-[10px]">
              {nav.section}
            </SidebarGroupLabel>
            <SidebarMenu>
              {nav.items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    className={cn(
                      "px-3 py-2.5 h-auto gap-3 rounded-2xl bg-transparent! text-text-subtitle! transition-colors duration-200 hover:text-brand-primary-dark!",
                      active === item.id &&
                        "bg-brand-primary/10! font-semibold! text-brand-primary!",
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 pt-2 group-data-[collapsible=icon]:hidden">
        <button className="flex w-full items-center gap-4 rounded-xl bg-brand-primary-dark/5 p-4 text-left transition-colors">
          <div className="rounded-full size-10 flex items-center justify-center bg-brand-primary-dark/10">
            <Headset size={20} className="text-brand-primary-dark" />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-text-primary leading-none">
              Need help?
            </p>
            <p className="text-xs font-medium text-text-secondary leading-none">
              Contact our support
            </p>
          </div>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
