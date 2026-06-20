import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { idbStorage, persistStorageKey } from '@/shared/lib/storage/idbStorage'
import { todayKey } from '@/shared/lib/date/formatDate'
import type { DayEntry, DayEntryInput, DiaryStore } from './types'

const asyncStorage = createJSONStorage(() => ({
  getItem: (name) => idbStorage.getItem(name),
  setItem: (name, value) => idbStorage.setItem(name, value),
  removeItem: (name) => idbStorage.removeItem(name),
}))

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      entries: {},
      selectedDate: todayKey(),
      hydrated: false,

      setSelectedDate: (date) => set({ selectedDate: date }),

      upsertEntry: (entry: DayEntryInput) => {
        const full: DayEntry = {
          ...entry,
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          entries: { ...state.entries, [entry.date]: full },
        }))
      },

      getEntry: (date) => get().entries[date],

      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: persistStorageKey,
      storage: asyncStorage,
      partialize: (state) => ({ entries: state.entries }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)
