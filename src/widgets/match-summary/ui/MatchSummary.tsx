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
      title="Match Overview"
      subtitle={isToday ? 'Сегодняшняя катка ещё не записана' : 'Нет данных за этот день'}
    >
        <p className={styles.empty}>
          {isToday
            ? 'Заполни форму — и здесь появится post-game экран.'
            : 'Выбери другой день или добавь запись.'}
        </p>
      </Panel>
    )
  }

  const isVictory = entry.mood >= 0
  const kda = {
    k: Math.max(0, entry.mood + 5),
    d: Math.max(0, 5 - entry.mood),
    a: entry.energyDrinks,
  }

  return (
    <Panel
      title="Match Overview"
      subtitle={formatDisplayDate(selectedDate)}
    >
      <div className={[styles.hero, isVictory ? styles.victory : styles.defeat].join(' ')}>
        <div className={styles.result}>
          <span className={styles.resultLabel}>Result</span>
          <span className={styles.resultValue}>
            {isVictory ? 'VICTORY' : 'DEFEAT'}
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
          <span className={styles.kdaNum} style={{ color: '#5cbb5c' }}>{kda.k}</span>
          <span className={styles.kdaLabel}>K</span>
        </div>
        <span className={styles.kdaSep}>/</span>
        <div className={styles.kdaItem}>
          <span className={styles.kdaNum} style={{ color: '#c04040' }}>{kda.d}</span>
          <span className={styles.kdaLabel}>D</span>
        </div>
        <span className={styles.kdaSep}>/</span>
        <div className={styles.kdaItem}>
          <span className={styles.kdaNum} style={{ color: '#5dade2' }}>{kda.a}</span>
          <span className={styles.kdaLabel}>A</span>
        </div>
      </div>

      <div className={styles.bars}>
        <StatBar
          label="Net Worth"
          value={entry.feltNetworth}
          max={8000}
          color="#c8a060"
          suffix=" g"
        />
        <StatBar
          label="Mana Restored"
          value={entry.energyDrinks * 120}
          max={1200}
          color="#5dade2"
          suffix=" MP"
        />
        <StatBar
          label="Mood Impact"
          value={entry.mood + 5}
          max={10}
          color={getMoodColor(entry.mood)}
          showPercent
        />
      </div>

      {entry.note && (
        <blockquote className={styles.note}>
          <span className={styles.noteLabel}>All Chat</span>
          {entry.note}
        </blockquote>
      )}
    </Panel>
  )
}
