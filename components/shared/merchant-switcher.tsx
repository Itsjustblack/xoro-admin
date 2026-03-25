"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCurrentMerchant,
  useMerchantActions,
  useMerchants,
} from "@/store/merchant";
import {
  Banknote,
  Building2,
  Check,
  ChevronsUpDown,
  CirclePlus,
  Store,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function MerchantSwitcher() {
  const currentMerchant = useCurrentMerchant();
  const merchants = useMerchants();
  const merchantActions = useMerchantActions();
  const router = useRouter();

  const otherMerchants = merchants.filter((m) => m.id !== currentMerchant?.id);

  const getMerchantIcon = (index: number) => {
    if (index % 3 === 0) return Banknote;
    if (index % 3 === 1) return Truck;
    return Store;
  };

  const handleSwitchMerchant = (merchantId: string) => {
    merchantActions.switchMerchant(merchantId);
    toast.success("Switching merchant...");
  };

  const handleCreateNew = () => {
    router.push("/merchant");
  };

  if (!currentMerchant) {
    return (
      <div className="flex w-full items-center justify-between rounded-xl px-3 py-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-xl font-bold tracking-tight text-brand-primary-dark">
            XoroPay
          </p>
          <p className="text-[10px] font-bold tracking-widest text-brand-primary-dark/60 uppercase">
            MERCHANT DASHBOARD
          </p>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 transition-colors hover:bg-surface-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20">
          <div className="flex flex-col gap-0.5">
            <p className="text-xl text-start font-bold tracking-tight text-brand-primary-dark">
              {currentMerchant.name}
            </p>
            <p className="text-[10px] font-bold tracking-widest text-brand-primary-dark/60 uppercase">
              MERCHANT DASHBOARD
            </p>
          </div>
          <ChevronsUpDown className="size-5 text-brand-primary-dark/50" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-63.25 rounded-2xl border border-brand-primary-dark/10 bg-surface-1 p-0 shadow-xl"
      >
        <div className="flex items-center gap-3 px-4 py-4 bg-brand-primary-dark/5">
          <Avatar className="size-10 rounded-xl">
            <AvatarFallback className="rounded-xl bg-brand-primary-dark text-white">
              <Building2 className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="text-[10px] font-bold tracking-widest text-brand-primary-dark uppercase">
                ACTIVE
              </p>
              <span className="size-2 rounded-full bg-legal" />
            </div>
            <p className="text-sm font-bold text-brand-primary-dark">
              {currentMerchant.name}
            </p>
          </div>
          <div className="flex size-6 items-center justify-center rounded-full bg-brand-primary-dark">
            <Check className="size-4 text-white" />
          </div>
        </div>

        {otherMerchants.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-6 pt-6 pb-1 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase">
              OTHER BUSINESSES
            </DropdownMenuLabel>
            {otherMerchants.map((merchant, index) => {
              const MerchantIcon = getMerchantIcon(index);

              return (
                <DropdownMenuItem
                  key={merchant.id}
                  className="group mx-3 my-1 gap-4 rounded-xl px-3 py-3.5 focus:bg-surface-3"
                  onClick={() => handleSwitchMerchant(merchant.id)}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-focus:bg-slate-200">
                    <MerchantIcon className="size-5 text-slate-500!" />
                  </div>
                  <p className="truncate text-sm font-semibold leading-none !text-slate-700! group-focus:text-slate-800!">
                    {merchant.name}
                  </p>
                </DropdownMenuItem>
              );
            })}
          </>
        )}

        <DropdownMenuSeparator />
        <div className="p-4">
          <DropdownMenuItem
            className="group h-auto py-3 cursor-pointer justify-center gap-2 rounded-lg bg-brand-primary-dark font-bold text-white focus:bg-brand-primary-dark/95"
            onClick={handleCreateNew}
          >
            <CirclePlus className="size-5 text-white!" />
            <span className="!text-white!">
              Create New Business
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
