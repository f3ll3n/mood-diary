import { APP_NAME, APP_SLOGAN } from '@/shared/config/constants'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>B2</div>
        <div>
          <h1 className={styles.title}>{APP_NAME}</h1>
          <p className={styles.slogan}>{APP_SLOGAN}</p>
        </div>
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeLabel}>Patch</span>
        <span className={styles.badgeValue}>7.36 mood</span>
      </div>
    </header>
  )
}
