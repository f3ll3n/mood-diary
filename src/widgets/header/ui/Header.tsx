import { useNavigationStore } from '@/shared/model/useNavigationStore'
import styles from './Header.module.scss'

const NAV_ITEMS = [
  { id: 'diary', label: 'HEROES' },
  { id: 'treasury', label: 'TREASURY' },
  { id: 'watch', label: 'WATCH' },
] as const

export function Header() {
  const currentTab = useNavigationStore((s) => s.currentTab)
  const setTab = useNavigationStore((s) => s.setTab)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoContainer} title="Dota 2 Reborn">
          <svg viewBox="0 0 100 100" className={styles.dotaLogo}>
            <rect width="100" height="100" rx="12" fill="#C23C2A" />
            <path d="M 15 15 L 85 85" stroke="white" strokeWidth="14" />
            <circle cx="25" cy="75" r="14" fill="white" />
            <circle cx="75" cy="25" r="14" fill="white" />
          </svg>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={[styles.navTab, currentTab === item.id && styles.navTabActive].filter(Boolean).join(' ')}
              aria-current={currentTab === item.id ? 'page' : undefined}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

    </header>
  )
}
