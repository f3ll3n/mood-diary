import { clampPercent } from '@/shared/lib/math/percent'
import styles from './StatBar.module.scss'

interface StatBarProps {
  label: string
  value: number
  max: number
  color?: string
  suffix?: string
  showPercent?: boolean
}

export function StatBar({
  label,
  value,
  max,
  color = '#8eb9d6',
  suffix = '',
  showPercent = false,
}: StatBarProps) {
  const percent = clampPercent(max > 0 ? (value / max) * 100 : 0)

  return (
    <div className={styles.stat}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {showPercent ? `${percent}%` : `${value}${suffix}`}
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
