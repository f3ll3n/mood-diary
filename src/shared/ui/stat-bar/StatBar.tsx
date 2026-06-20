import styles from './StatBar.module.scss'

interface StatBarProps {
  label: string
  value: number
  max: number
  color?: string
  suffix?: string
}

export function StatBar({ label, value, max, color = '#d4af37', suffix = '' }: StatBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={styles.stat}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>
          {value}
          {suffix}
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
