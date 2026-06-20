import { MOOD_MIN, MOOD_MAX } from '@/shared/config/constants'

export function getMoodColor(mood: number): string {
  const normalized = (mood - MOOD_MIN) / (MOOD_MAX - MOOD_MIN)

  if (normalized < 0.35) {
    return `hsl(220, 45%, ${38 + normalized * 30}%)`
  }
  if (normalized < 0.55) {
    return '#6b7280'
  }
  return `hsl(${18 + (1 - normalized) * 10}, 65%, ${42 + (normalized - 0.55) * 20}%)`
}

export function getMoodLabel(mood: number): string {
  if (mood <= -3) return 'депрессивная фаза'
  if (mood <= -1) return 'даун-тренд'
  if (mood <= 1) return 'стабильная катка'
  if (mood <= 3) return 'ап-lift'
  return 'beyond godlike фаза'
}
