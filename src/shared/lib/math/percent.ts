export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(100, Math.max(0, value))
}

export function toPercent(part: number, total: number): number {
  if (total <= 0) return 0
  return clampPercent(Math.round((part / total) * 100))
}

export function formatPercent(value: number): string {
  return `${clampPercent(value)}%`
}
