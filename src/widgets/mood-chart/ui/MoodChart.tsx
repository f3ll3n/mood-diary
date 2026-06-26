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
import { formatPercent, toPercent } from '@/shared/lib/math/percent'
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

  const stats = useMemo(() => {
    const filled = data.filter((d): d is typeof d & { mood: number } => d.mood != null)
    const recordedDays = filled.length

    if (!recordedDays) {
      return { avgMood: null as number | null, recordedDays: 0, winrate: null as number | null }
    }

    const avgMood = filled.reduce((sum, d) => sum + d.mood, 0) / recordedDays
    const winDays = filled.filter((d) => d.mood >= 0).length

    return {
      avgMood,
      recordedDays,
      winrate: toPercent(winDays, recordedDays),
    }
  }, [data])

  return (
    <Panel
      title="Performance Summary"
      subtitle="Статистика за последние 30 дней"
    >
      <div className={styles.summary}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Avg Mood</span>
          <span className={styles.statValue}>
            {stats.avgMood != null ? stats.avgMood.toFixed(1) : '—'}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Matches</span>
          <span className={styles.statValue}>{stats.recordedDays}/30</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Winrate</span>
          <span className={styles.statValue}>
            {stats.winrate != null ? formatPercent(stats.winrate) : '—'}
          </span>
        </div>
      </div>

      <p className={styles.footnote}>Winrate = доля дней с mood ≥ 0 среди записанных. Сатира, не диагноз.</p>

      <div className={styles.chartBlock}>
        <h3 className={styles.chartTitle}>Mood Timeline</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#697680', fontSize: 10, fontFamily: 'Roboto Condensed' }}
              interval="preserveStartEnd"
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              domain={[MOOD_MIN, MOOD_MAX]}
              tick={{ fill: '#697680', fontSize: 11, fontFamily: 'Roboto Condensed' }}
              width={28}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(14, 22, 30, 0.97)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 0,
                color: '#c8cdd2',
                fontFamily: 'Roboto Condensed',
              }}
              formatter={(value) => [value ?? 'нет данных', 'Mood']}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#8eb9d6"
              strokeWidth={2}
              dot={{ fill: '#c8cdd2', r: 3, stroke: '#1e2a34', strokeWidth: 1 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <h3 className={styles.chartTitle}>Daily Breakdown</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false} />
            <XAxis dataKey="label" hide />
            <YAxis
              domain={[MOOD_MIN, MOOD_MAX]}
              tick={{ fill: '#697680', fontSize: 11 }}
              width={28}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(14, 22, 30, 0.97)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 0,
                color: '#c8cdd2',
              }}
            />
            <Bar dataKey="mood" radius={0}>
              {data.map((entry) => (
                <Cell
                  key={entry.date}
                  fill={entry.mood != null ? getMoodColor(entry.mood) : 'rgba(105,118,128,0.25)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
