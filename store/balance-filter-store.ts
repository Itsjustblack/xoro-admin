"use client"

import { create } from "zustand"

import {
  createInitialFilterState,
  type FilterState,
} from "../lib/balance-filter-utils"

const cloneFilters = (filters: FilterState): FilterState => ({
  ...filters,
  status: [...filters.status],
  paymentMethod: [...filters.paymentMethod],
  currency: [...filters.currency],
  amount: { ...filters.amount },
  dateRange: { ...filters.dateRange },
})

interface BalanceFilterStoreProps {
  open: boolean
  appliedFilters: FilterState
  draftFilters: FilterState
  actions: {
    setOpen: (open: boolean) => void
    applyDraft: () => void
    resetDraft: () => void
    resetAll: () => void
    updateDraftFilters: (updater: (prev: FilterState) => FilterState) => void
  }
}

const balanceFilterStore = create<BalanceFilterStoreProps>((set, get) => ({
  open: false,
  appliedFilters: createInitialFilterState(),
  draftFilters: createInitialFilterState(),
  actions: {
    setOpen: (open) => {
      if (open) {
        set((state) => ({
          open: true,
          draftFilters: cloneFilters(state.appliedFilters),
        }))
        return
      }

      set({ open: false })
    },
    applyDraft: () => {
      const { draftFilters } = get()

      set({
        appliedFilters: cloneFilters(draftFilters),
        open: false,
      })
    },
    resetDraft: () => {
      set({ draftFilters: createInitialFilterState() })
    },
    resetAll: () => {
      set({
        appliedFilters: createInitialFilterState(),
        draftFilters: createInitialFilterState(),
        open: false,
      })
    },
    updateDraftFilters: (updater) => {
      set((state) => ({
        draftFilters: updater(state.draftFilters),
      }))
    },
  },
}))

export const useBalanceFilterStore = balanceFilterStore

export const useBalanceFilterOpen = () =>
  balanceFilterStore((state) => state.open)

export const useAppliedBalanceFilters = () =>
  balanceFilterStore((state) => state.appliedFilters)

export const useDraftBalanceFilters = () =>
  balanceFilterStore((state) => state.draftFilters)

export const useBalanceFilterActions = () =>
  balanceFilterStore((state) => state.actions)
