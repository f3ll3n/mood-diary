import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useDiaryStore } from '@/entities/day-entry'
import { getLastNDays, formatShortDate } from '@/shared/lib/date/formatDate'
import { getMoodColor } from '@/shared/lib/mood/getMoodColor'
import { MOOD_MIN, MOOD_MAX } from '@/shared/config/constants'
import { Panel } from '@/shared/ui/panel'
import styles from './MoodChart.module.scss'

export function MoodChart() {
  const entries = useDiaryStore((s) => s.entries)

  const data = useMemo(() => {
    return getLastNDays(30).map((date) => {
      const entry = entries[date]
      return {
        date,
        label: formatShortDate(date),
        mood: entry?.mood ?? null,
        networth: entry?.feltNetworth ?? null,
      }
    })
  }, [entries])

  const avgMood = useMemo(() => {
    const filled = data.filter((d) => d.mood != null)
    if (!filled.length) return null
    return filled.reduce((sum, d) => sum + (d.mood ?? 0), 0) / filled.length
  }, [data])

  const recordedDays = data.filter((d) => d.mood != null).length

  return (
    <Panel
      title="Post-game Summary"
      subtitle="Срез настроения за последние 30 дней — как график после катки"
      accent="blue"
    >
      <div className={styles.summary}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Средний mood</span>
          <span className={styles.statValue}>
            {avgMood != null ? avgMood.toFixed(1) : '—'}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Записей</span>
          <span className={styles.statValue}>{recordedDays}/30</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Winrate*</span>
          <span className={styles.statValue}>
            {recordedDays
              ? `${Math.round((data.filter((d) => (d.mood ?? 0) >= 0).length / recordedDays) * 100)}%`
              : '—'}
          </span>
        </div>
      </div>

      <p className={styles.footnote}>* Winrate = дней с mood ≥ 0. Сатира, не диагноз.</p>

      <div className={styles.chartBlock}>
        <h3 className={styles.chartTitle}>Mood over time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(139,115,64,0.2)" strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#8a8f9a', fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[MOOD_MIN, MOOD_MAX]}
              tick={{ fill: '#8a8f9a', fontSize: 11 }}
              width={28}
            />
            <Tooltip
              contentStyle={{
                background: '#151922',
                border: '1px solid #8b7340',
                borderRadius: 0,
                color: '#e8dcc4',
              }}
              formatter={(value) => [value ?? 'нет данных', 'Mood']}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#c4a35a"
              strokeWidth={2}
              dot={{ fill: '#d4af37', r: 3 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <h3 className={styles.chartTitle}>Daily mood bars</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(139,115,64,0.15)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#8a8f9a', fontSize: 9 }} hide />
            <YAxis domain={[MOOD_MIN, MOOD_MAX]} tick={{ fill: '#8a8f9a', fontSize: 11 }} width={28} />
            <Tooltip
              contentStyle={{
                background: '#151922',
                border: '1px solid #8b7340',
                borderRadius: 0,
                color: '#e8dcc4',
              }}
            />
            <Bar dataKey="mood" radius={[2, 2, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.date}
                  fill={entry.mood != null ? getMoodColor(entry.mood) : 'rgba(107,114,128,0.3)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
