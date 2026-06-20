import { NETWORTH_LABELS } from '@/shared/config/constants'
import styles from './NetworthInput.module.scss'

interface NetworthInputProps {
  value: number
  onChange: (value: number) => void
}

function getNetworthRank(value: number): string {
  return NETWORTH_LABELS.find((item) => value <= item.max)?.label ?? '—'
}

export function NetworthInput({ value, onChange }: NetworthInputProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>Ощущаемый нетворс</span>
        <span className={styles.rank}>{getNetworthRank(value)}</span>
      </div>

      <div className={styles.inputRow}>
        <input
          type="number"
          min={0}
          max={99999}
          step={100}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className={styles.input}
        />
        <span className={styles.gold}>gold</span>
      </div>

      <input
        type="range"
        min={0}
        max={8000}
        step={100}
        value={Math.min(value, 8000)}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
      />

      <p className={styles.hint}>
        Сколько «золота» ты чувствуешь в своей голове сегодня. Не MMR, но почти.
      </p>
    </div>
  )
}
