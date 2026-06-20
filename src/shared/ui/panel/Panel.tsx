import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Panel.module.scss'

interface PanelProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  accent?: 'gold' | 'blue' | 'red'
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Panel({ title, subtitle, children, className, accent = 'gold' }: PanelProps) {
  return (
    <section className={cx(styles.panel, styles[`accent_${accent}`], className)}>
      {(title || subtitle) && (
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={cx(styles.button, styles[`button_${variant}`], className)} {...props}>
      {children}
    </button>
  )
}
