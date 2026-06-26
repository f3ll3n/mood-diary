import { useDiaryStore } from '@/entities/day-entry'
import { useNavigationStore } from '@/shared/model/useNavigationStore'
import { Header } from '@/widgets/header'
import { DiaryPage } from '@/pages/diary'
import { TreasuryPage } from '@/pages/treasury'
import styles from './App.module.scss'

export function App() {
  const hydrated = useDiaryStore((s) => s.hydrated)
  const currentTab = useNavigationStore((s) => s.currentTab)

  if (!hydrated) {
    return (
      <div className={styles.loader}>
        <span className={styles.loaderText}>Connecting to match history...</span>
      </div>
    )
  }

  return (
    <div className={styles.appLayout}>
      <Header />
      <div className={styles.content}>
        {currentTab === 'diary' && <DiaryPage />}
        {currentTab === 'treasury' && <TreasuryPage />}
        {currentTab === 'watch' && (
          <div className={styles.placeholder}>
            <h2>WATCH</h2>
            <p>Replays and live games coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}
