import { IMerchant, Mode } from "@/lib/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface MerchantStoreProps {
  merchants: IMerchant[]
  mode: Mode
  currentMerchant: IMerchant | null
  currentMerchantId: string | null
  actions: {
    switchMerchant: (merchantId: string) => void
    setMerchants: (merchants: IMerchant[]) => void
    toggleMode: () => void
    clearPersistedMerchant: () => void
    clearMerchants: () => void
  }
}

const resolveCurrentMerchant = (
  merchants: IMerchant[],
  preferredMerchantId: string | null,
) => {
  if (!merchants.length) {
    return null
  }

  if (preferredMerchantId) {
    const persistedMerchant = merchants.find((m) => m.id === preferredMerchantId)
    if (persistedMerchant) {
      return persistedMerchant
    }
  }

  return merchants[0]
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
          const preferredMerchantId =
            get().currentMerchantId ?? get().currentMerchant?.id ?? null
          const selectedMerchant = resolveCurrentMerchant(
            merchants,
            preferredMerchantId,
          )

          set({
            merchants,
            currentMerchant: selectedMerchant,
            currentMerchantId: selectedMerchant?.id ?? null,
          })
        },
        switchMerchant: (id) => {
          const merchant = get().merchants.find((m) => m.id === id)
          if (merchant) {
            set({ currentMerchant: merchant, currentMerchantId: merchant.id })
          } else {
            console.warn(`Merchant with id ${id} not found.`)
          }
        },

        toggleMode: () =>
          set({ mode: get().mode === "test" ? "live" : "test" }),

        clearPersistedMerchant: () => {
          set({ currentMerchant: null, currentMerchantId: null })
        },

        clearMerchants: () => {
          set({
            merchants: [],
            currentMerchant: null,
            currentMerchantId: null,
            mode: "test",
          })
        },
      },
    }),
    {
      name: "xoropay-merchant-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentMerchantId: state.currentMerchantId,
        mode: state.mode,
      }),
    },
  ),
)

export const useCurrentMerchant = () =>
  useMerchantStore((state) => state.currentMerchant)

export const useMerchants = () => useMerchantStore((state) => state.merchants)

export const useMerchantActions = () =>
  useMerchantStore((state) => state.actions)

export const useCurrentMode = () => useMerchantStore((s) => s.mode)
