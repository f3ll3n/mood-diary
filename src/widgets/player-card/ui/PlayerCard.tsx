import { useMemo, useState, useRef, type CSSProperties } from 'react'
import { useDiaryStore } from '@/entities/day-entry'
import { MOOD_LABELS } from '@/shared/config/constants'
import { todayKey } from '@/shared/lib/date/formatDate'
import { getMoodColor } from '@/shared/lib/mood/getMoodColor'
import { toPercent } from '@/shared/lib/math/percent'
import { Button } from '@/shared/ui/panel'
import styles from './PlayerCard.module.scss'

export function PlayerCard() {
  const entries = useDiaryStore((s) => s.entries)
  const selectedDate = useDiaryStore((s) => s.selectedDate)
  const playerName = useDiaryStore((s) => s.playerName)
  const playerAvatar = useDiaryStore((s) => s.playerAvatar)
  const setPlayerProfile = useDiaryStore((s) => s.setPlayerProfile)

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(playerName)
  const [editAvatar, setEditAvatar] = useState<string | null>(playerAvatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const todayEntry = entries[todayKey()]
  const selectedEntry = entries[selectedDate]

  const stats = useMemo(() => {
    const monthEntries = Object.values(entries)
    const recorded = monthEntries.length
    const wins = monthEntries.filter((e) => e.mood >= 0).length
    return {
      recorded,
      winrate: toPercent(wins, recorded),
      avgMood: recorded
        ? (monthEntries.reduce((s, e) => s + e.mood, 0) / recorded).toFixed(1)
        : '—',
    }
  }, [entries])

  const displayEntry = selectedEntry ?? todayEntry

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setPlayerProfile(editName || 'Player', editAvatar)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(playerName)
    setEditAvatar(playerAvatar)
    setIsEditing(false)
  }

  return (
    <aside className={styles.card}>
      <div className={styles.avatarFrame}>
        <div
          className={[styles.avatar, isEditing && styles.avatarEditing].filter(Boolean).join(' ')}
          style={{
            '--mood-color': getMoodColor(displayEntry?.mood ?? 0),
            backgroundImage: (isEditing ? editAvatar : playerAvatar) ? `url(${isEditing ? editAvatar : playerAvatar})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } as CSSProperties}
          onClick={handleAvatarClick}
          title={isEditing ? 'Change Avatar' : undefined}
        >
          {!(isEditing ? editAvatar : playerAvatar) && (
            <span className={styles.avatarIcon}>☯</span>
          )}
          {isEditing && <div className={styles.avatarOverlay}>EDIT</div>}
        </div>
        <div className={styles.levelBadge}>β</div>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
      </div>

      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            className={styles.nameInput}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Player Name"
            maxLength={20}
          />
          <div className={styles.editActions}>
            <Button onClick={handleSave} className={styles.saveBtn}>Save</Button>
            <Button onClick={handleCancel} variant="ghost" className={styles.cancelBtn}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className={styles.profileInfo} onClick={() => setIsEditing(true)} title="Edit Profile">
          <h2 className={styles.playerName}>{playerName}</h2>
          <p className={styles.playerTitle}>
            {displayEntry ? MOOD_LABELS[displayEntry.mood] : 'без катки'}
          </p>
          <span className={styles.editHint}>✎</span>
        </div>
      )}

      <div className={styles.divider} />

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.winrate}%</span>
          <span className={styles.statLabel}>Winrate</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.recorded}</span>
          <span className={styles.statLabel}>Matches</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.avgMood}</span>
          <span className={styles.statLabel}>Avg Mood</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.mmrBlock}>
        <span className={styles.mmrLabel}>Mood Rating</span>
        <span
          className={styles.mmrValue}
          style={{ color: getMoodColor(displayEntry?.mood ?? 0) }}
        >
          {displayEntry ? (displayEntry.mood > 0 ? `+${displayEntry.mood}` : displayEntry.mood) : '—'}
        </span>
      </div>
    </aside>
  )
}
