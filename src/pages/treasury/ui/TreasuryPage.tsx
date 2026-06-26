import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/panel'
import styles from './TreasuryPage.module.scss'

type Rarity = 'common' | 'rare' | 'very_rare'

interface TreasureItem {
  id: number
  name: string
  rarity: Rarity
  image: string
}

const TREASURE_ITEMS: TreasureItem[] = [
  { id: 1, name: 'Сет "Стабильный режим"', rarity: 'common', image: '🛡️' },
  { id: 2, name: 'Курьер "Сонный кот"', rarity: 'common', image: '🐈' },
  { id: 3, name: 'Вард "Таблетница"', rarity: 'common', image: '💊' },
  { id: 4, name: 'Сет "Лёгкая грусть"', rarity: 'common', image: '🌧️' },
  { id: 5, name: 'Насмешка "Всё окей"', rarity: 'common', image: '😏' },
  { id: 6, name: 'Сет "Гипоманиакальный раш"', rarity: 'common', image: '⚡' },
  { id: 7, name: 'Курьер "Кофеиновый дух"', rarity: 'common', image: '☕' },
  { id: 8, name: 'Сет "Глубокая рефлексия"', rarity: 'common', image: '🌌' },
  { id: 9, name: 'Вард "Глаз психотерапевта"', rarity: 'common', image: '👁️' },
  { id: 10, name: 'Сет "Эмоциональные качели"', rarity: 'common', image: '🎢' },
  { id: 11, name: 'Сет "Золотая середина"', rarity: 'rare', image: '✨' },
  { id: 12, name: 'Курьер "Просветление"', rarity: 'rare', image: '🕊️' },
  { id: 13, name: 'Сет "Абсолютная ремиссия"', rarity: 'very_rare', image: '👑' },
]

export function TreasuryPage() {
  const [status, setStatus] = useState<'idle' | 'opening' | 'finished'>('idle')
  const [remaining, setRemaining] = useState<number[]>([])
  const [reward, setReward] = useState<TreasureItem | null>(null)

  const handleOpen = () => {
    const roll = Math.random()
    let selectedReward: TreasureItem
    if (roll < 0.05) {
      selectedReward = TREASURE_ITEMS.find((i) => i.rarity === 'very_rare')!
    } else if (roll < 0.2) {
      const rares = TREASURE_ITEMS.filter((i) => i.rarity === 'rare')
      selectedReward = rares[Math.floor(Math.random() * rares.length)]
    } else {
      const commons = TREASURE_ITEMS.filter((i) => i.rarity === 'common')
      selectedReward = commons[Math.floor(Math.random() * commons.length)]
    }

    setReward(selectedReward)
    setRemaining(TREASURE_ITEMS.map((i) => i.id))
    setStatus('opening')
  }

  const handleReset = () => {
    setStatus('idle')
    setRemaining([])
    setReward(null)
  }

  useEffect(() => {
    if (status === 'opening' && remaining.length > 1) {
      // Чем меньше предметов осталось, тем медленнее они пропадают
      const delay = Math.max(150, 900 - remaining.length * 60)
      
      const timeout = setTimeout(() => {
        setRemaining((prev) => {
          const eliminatable = prev.filter((id) => id !== reward?.id)
          if (eliminatable.length === 0) return prev
          const toEliminate = eliminatable[Math.floor(Math.random() * eliminatable.length)]
          return prev.filter((id) => id !== toEliminate)
        })
      }, delay)
      
      return () => clearTimeout(timeout)
    } else if (status === 'opening' && remaining.length === 1) {
      const timeout = setTimeout(() => setStatus('finished'), 800)
      return () => clearTimeout(timeout)
    }
  }, [status, remaining, reward])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Treasure of Bipolarity</h1>
        <p className={styles.subtitle}>Сокровищница I</p>
      </div>

      <div className={styles.grid}>
        {TREASURE_ITEMS.map((item) => {
          const isEliminated = status !== 'idle' && !remaining.includes(item.id)
          const isWinner = status === 'finished' && reward?.id === item.id

          return (
            <div
              key={item.id}
              className={[
                styles.itemCard,
                styles[`rarity_${item.rarity}`],
                isEliminated && styles.eliminated,
                isWinner && styles.winner,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.itemImage}>{item.image}</div>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemRarity}>
                  {item.rarity === 'very_rare'
                    ? 'Ultra Rare'
                    : item.rarity === 'rare'
                      ? 'Rare'
                      : 'Common'}
                </span>
              </div>
              {isEliminated && <div className={styles.cross}>✕</div>}
            </div>
          )
        })}
      </div>

      <div className={styles.actions}>
        {status === 'idle' && (
          <button className={styles.openBtn} onClick={handleOpen}>
            OPEN TREASURE
          </button>
        )}
        {status === 'opening' && (
          <div className={styles.openingText}>Распаковка...</div>
        )}
        {status === 'finished' && (
          <div className={styles.resultBlock}>
            <div className={styles.resultText}>Вы получили: {reward?.name}</div>
            <Button onClick={handleReset}>CONTINUE</Button>
          </div>
        )}
      </div>
    </div>
  )
}
