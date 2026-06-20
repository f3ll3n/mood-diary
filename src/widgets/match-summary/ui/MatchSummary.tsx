import { useDiaryStore } from '@/entities/day-entry'
import { MOOD_LABELS } from '@/shared/config/constants'
import { formatDisplayDate, todayKey } from '@/shared/lib/date/formatDate'
import { getMoodColor, getMoodLabel } from '@/shared/lib/mood/getMoodColor'
import { Panel } from '@/shared/ui/panel'
import { StatBar } from '@/shared/ui/stat-bar'
import styles from './MatchSummary.module.scss'

export function MatchSummary() {
  const selectedDate = useDiaryStore((s) => s.selectedDate)
  const entry = useDiaryStore((s) => s.entries[selectedDate])
  const isToday = selectedDate === todayKey()

  if (!entry) {
    return (
      <Panel
        title="Match Summary"
        subtitle={isToday ? 'Сегодняшняя катка ещё не записана' : 'Нет данных за этот день'}
        accent="red"
      >
        <p className={styles.empty}>
          {isToday
            ? 'Заполни форму слева — и здесь появится post-game экран.'
            : 'Выбери другой день или добавь запись.'}
        </p>
      </Panel>
    )
  }

  const kda = {
    k: Math.max(0, entry.mood + 5),
    d: Math.max(0, 5 - entry.mood),
    a: entry.energyDrinks,
  }

  return (
    <Panel
      title="Match Summary"
      subtitle={formatDisplayDate(selectedDate)}
      accent="red"
    >
      <div className={styles.hero}>
        <div className={styles.result}>
          <span className={styles.resultLabel}>Результат дня</span>
          <span
            className={styles.resultValue}
            style={{ color: getMoodColor(entry.mood) }}
          >
            {entry.mood >= 0 ? 'VICTORY' : 'DEFEAT'}
          </span>
        </div>

        <div className={styles.moodBlock}>
          <span className={styles.moodScore} style={{ color: getMoodColor(entry.mood) }}>
            {entry.mood > 0 ? `+${entry.mood}` : entry.mood}
          </span>
          <span className={styles.moodDesc}>{MOOD_LABELS[entry.mood]}</span>
          <span className={styles.phase}>{getMoodLabel(entry.mood)}</span>
        </div>
      </div>

      <div className={styles.kda}>
        <div className={styles.kdaItem}>
          <span className={styles.kdaNum} style={{ color: '#3d9a4f' }}>{kda.k}</span>
          <span className={styles.kdaLabel}>K (плюсы)</span>
        </div>
        <span className={styles.kdaSep}>/</span>
        <div className={styles.kdaItem}>
          <span className={styles.kdaNum} style={{ color: '#a94442' }}>{kda.d}</span>
          <span className={styles.kdaLabel}>D (минусы)</span>
        </div>
        <span className={styles.kdaSep}>/</span>
        <div className={styles.kdaItem}>
          <span className={styles.kdaNum} style={{ color: '#4a90d9' }}>{kda.a}</span>
          <span className={styles.kdaLabel}>A (clarity)</span>
        </div>
      </div>

      <div className={styles.bars}>
        <StatBar
          label="Ощущаемый нетворс"
          value={entry.feltNetworth}
          max={8000}
          color="#d4af37"
          suffix=" g"
        />
        <StatBar
          label="Clarity mana"
          value={entry.energyDrinks * 120}
          max={1200}
          color="#4a90d9"
          suffix=" MP"
        />
        <StatBar
          label="Mood impact"
          value={entry.mood + 5}
          max={10}
          color={getMoodColor(entry.mood)}
        />
      </div>

      {entry.note && (
        <blockquote className={styles.note}>
          <span className={styles.noteLabel}>All Chat:</span> {entry.note}
        </blockquote>
      )}
    </Panel>
  )
}
