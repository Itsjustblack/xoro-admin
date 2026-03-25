import { IMerchant, Mode } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MerchantStoreProps {
  merchants: IMerchant[];
  mode: Mode;
  currentMerchant: IMerchant | null;
  currentMerchantId: string | null;
  actions: {
    switchMerchant: (merchantId: string) => void;
    setMerchants: (merchants: IMerchant[]) => void;
    toogleMode: () => void;
    clearPersistedMerchant: () => void;
    clearMerchants: () => void;
  };
}

const useMerchantStore = create<MerchantStoreProps>()(
  persist(
    (set, get) => ({
      merchants: [],
      mode: "test",
      currentMerchant: null,
      currentMerchantId: null,
      actions: {
        setMerchants: (merchants) => {
          if (merchants && merchants.length > 0) {
            const persistedId = get().currentMerchantId;
            let selectedMerchant: IMerchant | null = null;

            // Try to find the persisted merchant
            if (persistedId) {
              selectedMerchant =
                merchants.find((m) => m.id === persistedId) || null;
            }

            // If no persisted merchant or it doesn't exist, use the first one
            if (!selectedMerchant) {
              selectedMerchant = merchants[0];
            }

            set({
              merchants,
              currentMerchant: selectedMerchant,
              currentMerchantId: selectedMerchant.id,
            });
          } else {
            set({ merchants });
          }
        },
        switchMerchant: (id) => {
          const merchant = get().merchants.find((m) => m.id === id);
          if (merchant) {
            set({ currentMerchant: merchant, currentMerchantId: merchant.id });
          } else {
            console.warn(`Merchant with id ${id} not found.`);
          }
        },

        toogleMode: () =>
          set({ mode: get().mode === "test" ? "live" : "test" }),

        clearPersistedMerchant: () => {
          set({ currentMerchant: null, currentMerchantId: null });
        },

        // Called by login page when ?from=logout query param is present
        // NOT called during logout itself to avoid UI glitches during navigation
        clearMerchants: () => {
          set({
            merchants: [],
            currentMerchant: null,
            currentMerchantId: null,
            mode: "test",
          });
        },
      },
    }),
    {
      name: "xoropay-merchant-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentMerchantId: state.currentMerchantId,
        currentMerchant: state.currentMerchant,
        merchants: state.merchants,
        mode: state.mode,
      }),
    },
  ),
);

export const useCurrentMerchant = () =>
  useMerchantStore((state) => state.currentMerchant);

export const useMerchants = () => useMerchantStore((state) => state.merchants);

export const useMerchantActions = () =>
  useMerchantStore((state) => state.actions);

export const useCurrentMode = () => useMerchantStore((s) => s.mode);
