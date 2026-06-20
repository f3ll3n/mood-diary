export interface DayEntry {
  date: string
  mood: number
  feltNetworth: number
  energyDrinks: number
  note: string
  updatedAt: string
}

export type DayEntryInput = Omit<DayEntry, 'updatedAt'>

export interface DiaryState {
  entries: Record<string, DayEntry>
  selectedDate: string
  hydrated: boolean
}

export interface DiaryActions {
  setSelectedDate: (date: string) => void
  upsertEntry: (entry: DayEntryInput) => void
  getEntry: (date: string) => DayEntry | undefined
  setHydrated: (value: boolean) => void
}

export type DiaryStore = DiaryState & DiaryActions
