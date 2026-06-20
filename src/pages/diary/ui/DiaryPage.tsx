import { Header } from '@/widgets/header'
import { DayEntryForm } from '@/features/day-entry-form'
import { MoodCalendar } from '@/widgets/mood-calendar'
import { MatchSummary } from '@/widgets/match-summary'
import { MoodChart } from '@/widgets/mood-chart'
import styles from './DiaryPage.module.scss'

export function DiaryPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.column}>
          <DayEntryForm />
          <MoodCalendar />
        </div>

        <div className={styles.column}>
          <MatchSummary />
          <MoodChart />
        </div>
      </main>

      <footer className={styles.footer}>
        Данные хранятся локально в IndexedDB. Не замена терапии — инструмент самонаблюдения.
      </footer>
    </div>
  )
}
