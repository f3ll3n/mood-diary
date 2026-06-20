import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, subDays } from 'date-fns'
import { ru } from 'date-fns/locale'

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function parseDateKey(key: string): Date {
  return parseISO(key)
}

export function formatDisplayDate(key: string): string {
  return format(parseDateKey(key), 'd MMMM yyyy', { locale: ru })
}

export function formatShortDate(key: string): string {
  return format(parseDateKey(key), 'd MMM', { locale: ru })
}

export function getMonthDays(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month, 1))
  const end = endOfMonth(start)
  return eachDayOfInterval({ start, end })
}

export function getLastNDays(n: number): string[] {
  const today = new Date()
  return Array.from({ length: n }, (_, i) => toDateKey(subDays(today, n - 1 - i)))
}
