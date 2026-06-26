import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Panel.module.scss'

interface PanelProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  ornate?: boolean
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Panel({
  title,
  subtitle,
  children,
  className,
  ornate = true,
}: PanelProps) {
  return (
    <section className={cx(styles.panel, className)}>
      {ornate && (
        <>
          <span className={styles.cornerTL} aria-hidden />
          <span className={styles.cornerTR} aria-hidden />
          <span className={styles.cornerBL} aria-hidden />
          <span className={styles.cornerBR} aria-hidden />
        </>
      )}
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
    <button className={cx(styles.button, variant === 'ghost' && styles.button_ghost, className)} {...props}>
      {children}
    </button>
  )
}
