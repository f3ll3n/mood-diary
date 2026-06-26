import { create } from 'zustand'

interface NavigationStore {
  currentTab: string
  setTab: (tab: string) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentTab: 'diary',
  setTab: (tab) => set({ currentTab: tab }),
}))
