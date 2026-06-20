import styles from './EnergyDrinksInput.module.scss'

interface EnergyDrinksInputProps {
  value: number
  onChange: (value: number) => void
}

const MANA_PER_DRINK = 120

export function EnergyDrinksInput({ value, onChange }: EnergyDrinksInputProps) {
  const totalMana = value * MANA_PER_DRINK

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>Clarity Mana</span>
        <span className={styles.mana}>{totalMana} MP восстановлено</span>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => onChange(Math.max(0, value - 1))}
          aria-label="Минус один энергетик"
        >
          −
        </button>

        <div className={styles.count}>
          <span className={styles.number}>{value}</span>
          <span className={styles.unit}>энергетиков</span>
        </div>

        <button
          type="button"
          className={styles.btn}
          onClick={() => onChange(value + 1)}
          aria-label="Плюс один энергетик"
        >
          +
        </button>
      </div>

      <div className={styles.flasks}>
        {Array.from({ length: Math.min(value, 12) }, (_, i) => (
          <span key={i} className={styles.flask} title="Clarity" />
        ))}
        {value > 12 && <span className={styles.overflow}>+{value - 12}</span>}
      </div>

      <p className={styles.hint}>
        Сатирический счётчик «кларити маны». Не медицинский совет — просто метрика дня.
      </p>
    </div>
  )
}
