import { useEffect, useState, type CSSProperties } from 'react'
import { MOOD_LABELS, MOOD_MIN, MOOD_MAX } from '@/shared/config/constants'
import { getMoodColor } from '@/shared/lib/mood/getMoodColor'
import styles from './MoodRating.module.scss'

interface MoodRatingProps {
  value: number
  onChange: (value: number) => void
}

export function MoodRating({ value, onChange }: MoodRatingProps) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    setLocal(value)
  }, [value])

  return (
    <div className={styles.root}>
      <div className={styles.display}>
        <span className={styles.number} style={{ color: getMoodColor(local) }}>
          {local > 0 ? `+${local}` : local}
        </span>
        <span className={styles.label}>{MOOD_LABELS[local] ?? '—'}</span>
      </div>

      <input
        type="range"
        min={MOOD_MIN}
        max={MOOD_MAX}
        step={1}
        value={local}
        onChange={(e) => {
          const next = Number(e.target.value)
          setLocal(next)
          onChange(next)
        }}
        className={styles.slider}
        style={{ '--mood-color': getMoodColor(local) } as CSSProperties}
      />

      <div className={styles.scale}>
        <span>тильт</span>
        <span>нейтрал</span>
        <span>рампage</span>
      </div>
    </div>
  )
}
