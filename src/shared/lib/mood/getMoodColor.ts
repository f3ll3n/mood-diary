import { MOOD_MIN, MOOD_MAX } from '@/shared/config/constants'

export function getMoodColor(mood: number): string {
  const normalized = (mood - MOOD_MIN) / (MOOD_MAX - MOOD_MIN)

  if (normalized < 0.35) {
    return `hsl(210, 35%, ${38 + normalized * 25}%)`
  }
  if (normalized < 0.55) {
    return '#697680'
  }
  return `hsl(${8 + (1 - normalized) * 8}, 55%, ${40 + (normalized - 0.55) * 18}%)`
}

export function getMoodLabel(mood: number): string {
  console.log(mood);
  if (mood <= -3) return 'депрессивная фаза'
  if (mood <= -1) return 'даун-тренд'
  if (mood <= 1) return 'стабильная катка'
  if (mood <= 3) return 'ап-lift'
  return 'beyond godlike фаза'
}
