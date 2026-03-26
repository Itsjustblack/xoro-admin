"use client"

import { create } from "zustand"

import {
  createInitialFilterState,
  type FilterState,
} from "./balance-filter-utils"

const cloneFilters = (filters: FilterState): FilterState => ({
  ...filters,
  status: [...filters.status],
  paymentMethod: [...filters.paymentMethod],
  currency: [...filters.currency],
  amount: { ...filters.amount },
  dateRange: { ...filters.dateRange },
})

type BalanceFilterStore = {
  open: boolean
  appliedFilters: FilterState
  draftFilters: FilterState
  setOpen: (open: boolean) => void
  applyDraft: () => void
  resetDraft: () => void
  resetAll: () => void
  updateDraftFilters: (updater: (prev: FilterState) => FilterState) => void
}

export const useBalanceFilterStore = create<BalanceFilterStore>((set, get) => ({
  open: false,
  appliedFilters: createInitialFilterState(),
  draftFilters: createInitialFilterState(),
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
}))
