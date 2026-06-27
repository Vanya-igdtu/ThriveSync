import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { Card, Badge, Button, SectionLabel, PageLoader, ErrorState, EmptyState } from '../components/ui'
import { fetchHistory } from '../services/api'
import { PERSONA_COLORS, PERSONA_ICONS, BURNOUT_LEVELS } from '../constants/personas'

const PIE_COLORS = ['#7c6cfc', '#2dd4bf', '#f97316', '#f43f5e']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-xl text-xs border" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === 'burnout' ? 'Burnout' : 'Wellbeing'}: {p.value}{p.name === 'burnout' ? '%' : '/100'}
        </p>
      ))}
    </div>
  )
}

export default function History() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = () => {
    setLoading(true)
    fetchHistory()
      .then((res) => {
        const rows = Array.isArray(res) ? res : res.history ?? []
        setData(rows.slice().reverse())
        setLoading(false)
      })
      .catch((err) => { setError(err.message); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  if (loading) return <PageLoader message="Loading your history..." />
  if (error) return <ErrorState message={error} onRetry={load} />
  if (data.length === 0) return (
    <EmptyState
      icon="📭"
      title="No assessments yet"
      description="Complete your first assessment to see your history and trends here."
      action={<Button onClick={() => navigate('/assessment')}>Take Assessment →</Button>}
    />
  )

  const trendData = data.slice(0, 10).reverse().map((row, i) => ({
    name: `#${i + 1}`,
    burnout: Math.round((row.burnout_probability ?? 0) * 100),
    wellbeing: Math.round(row.wellbeing_score ?? 0),
  }))

  const personaCount = data.reduce((acc, row) => {
    const key = row.persona ?? 'Unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(personaCount).map(([name, value]) => ({ name, value }))

  const avgBurnout = Math.round(data.reduce((s, r) => s + (r.burnout_probability ?? 0) * 100, 0) / data.length)
  const avgWellbeing = Math.round(data.reduce((s, r) => s + (r.wellbeing_score ?? 0), 0) / data.length)

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-up">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)' }}>
            {data.length} assessment{data.length !== 1 ? 's' : ''} recorded
          </p>
          <h1 className="text-2xl font-bold gradient-text">Your History</h1>
        </div>
        <Button onClick={() => navigate('/assessment')}>New Assessment →</Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger">
        {[
          { label: 'Total Assessments', value: data.length, color: 'var(--color-accent)' },
          { label: 'Avg Burnout Risk', value: `${avgBurnout}%`, color: 'var(--color-rose)' },
          { label: 'Avg Wellbeing', value: `${avgWellbeing}/100`, color: 'var(--color-teal)' },
          { label: 'Unique Personas', value: pieData.length, color: 'var(--color-amber)' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl border p-4 animate-fade-up"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>{label}</p>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Trend charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <SectionLabel>Burnout Probability Trend</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: 'var(--color-muted)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="burnout" stroke="var(--color-rose)" strokeWidth={2} dot={{ fill: 'var(--color-rose)', r: 4 }} activeDot={{ r: 6 }} name="burnout" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionLabel>Wellbeing Score Trend</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: 'var(--color-muted)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="wellbeing" stroke="var(--color-teal)" strokeWidth={2} dot={{ fill: 'var(--color-teal)', r: 4 }} activeDot={{ r: 6 }} name="wellbeing" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Persona distribution */}
      <Card>
        <SectionLabel>Persona Distribution</SectionLabel>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
              {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: '12px', fontSize: '12px', color: 'var(--color-text)' }} />
            <Legend formatter={(v) => <span style={{ color: 'var(--color-muted)', fontSize: '12px' }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <Card>
        <SectionLabel>All Assessments</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['#', 'Date', 'Risk Level', 'Burnout %', 'Wellbeing', 'Persona'].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const level = BURNOUT_LEVELS[row.burnout_prediction] || BURNOUT_LEVELS['Moderate']
                const pColor = PERSONA_COLORS[row.persona_id] ?? 'var(--color-accent)'
                const pIcon = PERSONA_ICONS[row.persona_id] ?? '🧬'
                return (
                  <tr
                    key={row.id ?? i}
                    style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="py-3 px-3" style={{ color: 'var(--color-muted)' }}>{data.length - i}</td>
                    <td className="py-3 px-3" style={{ color: 'var(--color-muted)' }}>{formatDate(row.created_at)}</td>
                    <td className="py-3 px-3"><Badge color={level.color} bg={level.bg}>{row.burnout_prediction}</Badge></td>
                    <td className="py-3 px-3 font-semibold tabular-nums" style={{ color: level.color }}>{Math.round((row.burnout_probability ?? 0) * 100)}%</td>
                    <td className="py-3 px-3 font-semibold tabular-nums" style={{ color: 'var(--color-teal)' }}>{Math.round(row.wellbeing_score ?? 0)}/100</td>
                    <td className="py-3 px-3">
                      <span className="flex items-center gap-1.5">
                        <span>{pIcon}</span>
                        <span style={{ color: pColor }}>{row.persona}</span>
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return '—' }
}
