import { useDiaryStore } from '@/entities/day-entry'
import { DiaryPage } from '@/pages/diary'
import styles from './App.module.scss'

export function App() {
  const hydrated = useDiaryStore((s) => s.hydrated)

  if (!hydrated) {
    return (
      <div className={styles.loader}>
        <span className={styles.loaderText}>Loading match data...</span>
      </div>
    )
  }

  return <DiaryPage />
}
