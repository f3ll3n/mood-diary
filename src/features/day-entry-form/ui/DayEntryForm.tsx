import { useEffect, useState } from 'react'
import { useDiaryStore } from '@/entities/day-entry'
import { MoodRating } from '@/features/mood-rating'
import { NetworthInput } from '@/features/networth-input'
import { EnergyDrinksInput } from '@/features/energy-drinks-input'
import { Button, Panel } from '@/shared/ui/panel'
import { todayKey } from '@/shared/lib/date/formatDate'
import styles from './DayEntryForm.module.scss'

const emptyDraft = {
  mood: 0,
  feltNetworth: 2500,
  energyDrinks: 0,
  note: '',
}

export function DayEntryForm() {
  const selectedDate = useDiaryStore((s) => s.selectedDate)
  const entry = useDiaryStore((s) => s.entries[selectedDate])
  const upsertEntry = useDiaryStore((s) => s.upsertEntry)
  const isToday = selectedDate === todayKey()

  const [draft, setDraft] = useState(emptyDraft)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (entry) {
      setDraft({
        mood: entry.mood,
        feltNetworth: entry.feltNetworth,
        energyDrinks: entry.energyDrinks,
        note: entry.note,
      })
    } else {
      setDraft(emptyDraft)
    }
    setSaved(false)
  }, [selectedDate, entry])

  const handleSave = () => {
    upsertEntry({
      date: selectedDate,
      ...draft,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Panel
      title={isToday ? 'Катка дня' : 'Запись за день'}
      subtitle={isToday ? 'Оцени сегодняшний матчлог' : 'Редактирование прошлой катки'}
      accent="gold"
    >
      <div className={styles.form}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Общее настроение</h3>
          <MoodRating
            value={draft.mood}
            onChange={(mood) => setDraft((d) => ({ ...d, mood }))}
          />
        </section>

        <section className={styles.section}>
          <NetworthInput
            value={draft.feltNetworth}
            onChange={(feltNetworth) => setDraft((d) => ({ ...d, feltNetworth }))}
          />
        </section>

        <section className={styles.section}>
          <EnergyDrinksInput
            value={draft.energyDrinks}
            onChange={(energyDrinks) => setDraft((d) => ({ ...d, energyDrinks }))}
          />
        </section>

        <section className={styles.section}>
          <label className={styles.noteLabel} htmlFor="day-note">
            Заметка в All Chat
          </label>
          <textarea
            id="day-note"
            className={styles.note}
            rows={3}
            placeholder="Что произошло на лайне жизни..."
            value={draft.note}
            onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
          />
        </section>

        <div className={styles.actions}>
          <Button onClick={handleSave}>{saved ? '✓ Сохранено' : 'Сохранить катку'}</Button>
        </div>
      </div>
    </Panel>
  )
}
