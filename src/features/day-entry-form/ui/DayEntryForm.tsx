import { useEffect, useState } from 'react'
import { useDiaryStore } from '@/entities/day-entry'
import { MoodRating } from '@/features/mood-rating'
import { NetworthInput } from '@/features/networth-input'
import { EnergyDrinksInput } from '@/features/energy-drinks-input'
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
    <>
      <div className={styles.centerHero}>
        <h2 className={styles.heroTitle}>{isToday ? 'CURRENT MATCH' : 'MATCH REPLAY'}</h2>
        
        <div className={styles.moodWrapper}>
          <MoodRating
            value={draft.mood}
            onChange={(mood) => setDraft((d) => ({ ...d, mood }))}
          />
        </div>

        <div className={styles.statsRow}>
          <NetworthInput
            value={draft.feltNetworth}
            onChange={(feltNetworth) => setDraft((d) => ({ ...d, feltNetworth }))}
          />
          <div className={styles.divider} />
          <EnergyDrinksInput
            value={draft.energyDrinks}
            onChange={(energyDrinks) => setDraft((d) => ({ ...d, energyDrinks }))}
          />
        </div>
      </div>

      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <span className={styles.chatTab}>All Chat</span>
        </div>
        <textarea
          className={styles.chatInput}
          placeholder="Say something..."
          value={draft.note}
          onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
        />
      </div>

      <button className={styles.playButton} onClick={handleSave}>
        <span className={styles.playButtonText}>{saved ? 'SAVED' : 'RECORD MATCH'}</span>
      </button>
    </>
  )
}
