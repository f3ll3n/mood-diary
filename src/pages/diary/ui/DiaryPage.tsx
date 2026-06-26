import { useState } from 'react'
import { PlayerCard } from '@/widgets/player-card'
import { DayEntryForm } from '@/features/day-entry-form'
import { MoodCalendar } from '@/widgets/mood-calendar'
import { MatchSummary } from '@/widgets/match-summary'
import { MoodChart } from '@/widgets/mood-chart'
import styles from './DiaryPage.module.scss'

export function DiaryPage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <div className={styles.dashboard}>
      <aside className={styles.leftSidebar}>
        <PlayerCard />
        
        <button 
          className={styles.mobileAccordionToggle}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          <span className={styles.toggleText}>MATCH CALENDAR</span>
          <span className={styles.toggleIcon}>{isCalendarOpen ? '▲' : '▼'}</span>
        </button>

        <div className={[styles.calendarWrapper, isCalendarOpen && styles.calendarOpen].filter(Boolean).join(' ')}>
          <MoodCalendar />
        </div>
      </aside>

      <main className={styles.centerArea}>
        <DayEntryForm />
      </main>

      <aside className={styles.rightSidebar}>
        <MatchSummary />
        <MoodChart />
      </aside>
    </div>
  )
}
