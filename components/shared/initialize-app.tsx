"use client";

import { IUser } from "@/lib/types";
import { useAuthActions } from "@/store/auth";
import {
  useCurrentMerchant,
  useCurrentMode,
  useMerchantActions,
} from "@/store/merchant";
import { ReactNode, useEffect } from "react";

interface InitializeAppProps {
  user: IUser;
  children: ReactNode;
}

export default function InitializeApp({ user, children }: InitializeAppProps) {
  const { setUser } = useAuthActions();
  const { setMerchants } = useMerchantActions();
  const currentMerchant = useCurrentMerchant();
  const mode = useCurrentMode();

  useEffect(() => {
    setUser(user);
    setMerchants(user.merchants);
  }, [setMerchants, setUser, user]);

  useEffect(() => {
    if (currentMerchant?.id) {
      document.cookie = `current_merchant_id=${currentMerchant.id}; path=/; samesite=lax`;
    }
  }, [currentMerchant?.id]);

  useEffect(() => {
    document.cookie = `dashboard_mode=${mode}; path=/; samesite=lax`;
  }, [mode]);

  return <>{children}</>;
}
