import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  getDay,
  isSameMonth,
} from 'date-fns'
import { ru } from 'date-fns/locale'
import { useDiaryStore } from '@/entities/day-entry'
import { toDateKey } from '@/shared/lib/date/formatDate'
import { getMoodColor } from '@/shared/lib/mood/getMoodColor'
import { Panel } from '@/shared/ui/panel'
import styles from './MoodCalendar.module.scss'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export function MoodCalendar() {
  const entries = useDiaryStore((s) => s.entries)
  const selectedDate = useDiaryStore((s) => s.selectedDate)
  const setSelectedDate = useDiaryStore((s) => s.setSelectedDate)

  const [viewDate, setViewDate] = useState(() => new Date())

  const days = useMemo(() => {
    const start = startOfMonth(viewDate)
    const end = endOfMonth(viewDate)
    return eachDayOfInterval({ start, end })
  }, [viewDate])

  const leadingBlanks = (getDay(startOfMonth(viewDate)) + 6) % 7

  return (
    <Panel title="Календарь каток" subtitle="Выбери день для просмотра или редактирования">
      <div className={styles.calendar}>
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => setViewDate((d) => subMonths(d, 1))}
            aria-label="Предыдущий месяц"
          >
            ‹
          </button>
          <span className={styles.monthLabel}>
            {format(viewDate, 'LLLL yyyy', { locale: ru })}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => setViewDate((d) => addMonths(d, 1))}
            aria-label="Следующий месяц"
          >
            ›
          </button>
        </div>

        <div className={styles.weekdays}>
          {WEEKDAYS.map((day) => (
            <span key={day} className={styles.weekday}>
              {day}
            </span>
          ))}
        </div>

        <div className={styles.grid}>
          {Array.from({ length: leadingBlanks }, (_, i) => (
            <div key={`blank-${i}`} className={styles.blank} />
          ))}

          {days.map((day) => {
            const key = toDateKey(day)
            const entry = entries[key]
            const isSelected = key === selectedDate
            const inMonth = isSameMonth(day, viewDate)

            return (
              <button
                key={key}
                type="button"
                className={[
                  styles.day,
                  isSelected && styles.selected,
                  !inMonth && styles.outside,
                  entry && styles.hasEntry,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setSelectedDate(key)}
                style={entry ? { '--mood-color': getMoodColor(entry.mood) } as CSSProperties : undefined}
              >
                <span className={styles.dayNum}>{format(day, 'd')}</span>
                {entry && (
                  <span className={styles.moodDot} title={`Настроение: ${entry.mood}`} />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Panel>
  )
}
