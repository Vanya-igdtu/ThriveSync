import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Badge, Button, ProgressBar, SectionLabel, PageLoader } from '../components/ui'
import { PERSONA_COLORS, PERSONA_ICONS, BURNOUT_LEVELS } from '../constants/personas'

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('lastResult')
    if (!raw) { navigate('/assessment'); return }
    setResult(JSON.parse(raw))
  }, [navigate])

  if (!result) return <PageLoader message="Loading your results..." />

  const { burnout_prediction, burnout_probability, wellbeing_score, persona_id, persona, recommendations, burnout_explanation } = result

  const burnoutPct = Math.round(burnout_probability * 100)
  const wellbeingPct = Math.round(wellbeing_score)
  const burnoutLevel = BURNOUT_LEVELS[burnout_prediction] || BURNOUT_LEVELS['Moderate']
  const personaColor = PERSONA_COLORS[persona_id] ?? 'var(--color-accent)'
  const personaIcon = PERSONA_ICONS[persona_id] ?? '🧬'

  const shapSorted = [...(burnout_explanation || [])].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
  const maxImpact = Math.max(...shapSorted.map((s) => Math.abs(s.impact)), 0.001)

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-up">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-muted)' }}>
            ThriveSync · Wellness Report
          </p>
          <h1 className="text-2xl font-bold gradient-text">Your Results</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/assessment')}>Retake</Button>
          <Button variant="secondary" onClick={() => navigate('/history')}>History</Button>
        </div>
      </div>

      {/* Top 3 stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">

        <Card glow>
          <SectionLabel>Burnout Risk</SectionLabel>
          <div className="flex items-end justify-between mb-3">
            <span className="text-4xl font-bold" style={{ color: burnoutLevel.color }}>
              {burnoutPct}%
            </span>
            <Badge color={burnoutLevel.color} bg={burnoutLevel.bg}>{burnoutLevel.label}</Badge>
          </div>
          <ProgressBar value={burnoutPct} max={100} color={burnoutLevel.color} />
          <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>Probability of burnout</p>
        </Card>

        <Card>
          <SectionLabel>Wellbeing Score</SectionLabel>
          <div className="flex items-end justify-between mb-3">
            <span className="text-4xl font-bold" style={{ color: 'var(--color-teal)' }}>
              {wellbeingPct}
              <span className="text-lg font-normal" style={{ color: 'var(--color-muted)' }}>/100</span>
            </span>
            <Badge color="var(--color-teal)">
              {wellbeingPct >= 70 ? 'Good' : wellbeingPct >= 40 ? 'Fair' : 'Low'}
            </Badge>
          </div>
          <ProgressBar value={wellbeingPct} max={100} color="var(--color-teal)" />
          <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>Mental & digital wellness</p>
        </Card>

        <Card>
          <SectionLabel>Prediction</SectionLabel>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3"
            style={{ background: burnoutLevel.bg }}>
            {burnoutPct >= 70 ? '🔥' : burnoutPct >= 40 ? '⚠️' : '✅'}
          </div>
          <p className="text-base font-semibold mb-1" style={{ color: burnoutLevel.color }}>
            {burnout_prediction} Risk
          </p>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            {burnoutPct >= 70 ? 'Take immediate steps to reduce stress.' : burnoutPct >= 40 ? 'Monitor your habits closely.' : 'Keep up your healthy routines!'}
          </p>
        </Card>
      </div>

      {/* Persona */}
      <Card>
        <SectionLabel>Your Digital Persona</SectionLabel>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: `${personaColor}22`, border: `2px solid ${personaColor}44` }}
          >
            {personaIcon}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1" style={{ color: personaColor }}>{persona}</h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{getPersonaDescription(persona_id)}</p>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card>
        <SectionLabel>Personalised Recommendations</SectionLabel>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-xl card-hover" style={{ background: 'var(--color-surface-2)' }}>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'var(--color-accent-glow)', color: 'var(--color-accent)' }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* SHAP */}
      <Card>
        <SectionLabel>Why this prediction? — Key Factors</SectionLabel>
        <p className="text-xs mb-5" style={{ color: 'var(--color-muted)' }}>
          These habits influenced your burnout score the most, powered by SHAP explainability.
        </p>
        <div className="space-y-4">
          {shapSorted.map((item) => {
            const isRisk = item.direction === 'increases_risk' || item.impact > 0
            const barColor = isRisk ? 'var(--color-rose)' : 'var(--color-teal)'
            const barWidth = (Math.abs(item.impact) / maxImpact) * 100
            return (
              <div key={item.feature}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{formatFeatureName(item.feature)}</span>
                  <div className="flex items-center gap-2">
                    <Badge color={barColor}>{isRisk ? '↑ Risk' : '↓ Risk'}</Badge>
                    <span className="text-xs tabular-nums" style={{ color: 'var(--color-muted)' }}>
                      {Math.abs(item.impact).toFixed(3)}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-surface-2)' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${barWidth}%`, background: barColor }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Bottom CTA */}
      <div className="flex justify-center pb-4">
        <Button onClick={() => navigate('/history')} variant="secondary">
          View All Past Results →
        </Button>
      </div>
    </main>
  )
}

function formatFeatureName(name) {
  return name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function getPersonaDescription(id) {
  const map = {
    0: 'You tend to stay offline but carry high internal stress. Focus on mindfulness and social connection.',
    1: 'You have a healthy relationship with technology and manage your time well. Keep it up!',
    2: 'Late-night scrolling and high screen time are draining your energy. Small habit shifts can help.',
    3: 'You are highly engaged online and productive, but watch for overstimulation and rest deficits.',
  }
  return map[id] ?? 'Your digital lifestyle has a unique pattern. Review your recommendations below.'
}
