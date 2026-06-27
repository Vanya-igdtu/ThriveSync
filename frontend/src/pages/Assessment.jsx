import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FORM_SECTIONS, DEFAULT_VALUES } from '../constants/formFields'
import { SliderField, RatingField, SelectField } from '../components/assessment/FormFields'
import { Button, Spinner } from '../components/ui'
import { submitAssessment } from '../services/api'

export default function Assessment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const totalSteps = FORM_SECTIONS.length
  const currentSection = FORM_SECTIONS[step]
  const isLast = step === totalSteps - 1
  const progressPct = ((step + 1) / totalSteps) * 100

  const handleChange = (name, value) => setValues((p) => ({ ...p, [name]: value }))
  const handleBack = () => { if (step > 0) setStep((s) => s - 1); setError(null) }
  const handleNext = () => { if (step < totalSteps - 1) setStep((s) => s + 1); setError(null) }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await submitAssessment(values)
      sessionStorage.setItem('lastResult', JSON.stringify(result))
      sessionStorage.setItem('lastInput', JSON.stringify(values))
      navigate('/results')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-32 flex flex-col items-center gap-6 animate-fade-in">
        <div className="animate-pulse-glow w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-accent-glow)' }}>
          <span className="text-2xl">🧠</span>
        </div>
        <Spinner size={32} />
        <div className="text-center space-y-1">
          <p className="font-semibold">Analysing your data...</p>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Our ML model is predicting your burnout risk and wellbeing score
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)' }}>
          Step {step + 1} of {totalSteps}
        </p>
        <h1 className="text-2xl font-bold mb-1">
          {currentSection.emoji} {currentSection.title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {currentSection.description}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 animate-fade-up">
        <div className="flex gap-3 mb-3 flex-wrap">
          {FORM_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => i < step && setStep(i)}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: i <= step ? 'var(--color-accent)' : 'var(--color-muted)', cursor: i < step ? 'pointer' : 'default' }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: i < step ? 'var(--color-accent)' : i === step ? 'var(--color-accent-glow)' : 'var(--color-surface-2)',
                  border: i === step ? '2px solid var(--color-accent)' : '2px solid transparent',
                  color: i < step ? '#fff' : i === step ? 'var(--color-accent)' : 'var(--color-muted)',
                }}
              >
                {i < step ? '✓' : i + 1}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-surface-2)' }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%`, background: 'linear-gradient(to right, var(--color-accent), var(--color-teal))' }}
          />
        </div>
      </div>

      {/* Fields */}
      <div
        key={step}
        className="rounded-2xl border p-6 space-y-8 mb-6 animate-fade-up"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        {currentSection.fields.map((field) => {
          const val = values[field.name]
          if (field.type === 'slider') return <SliderField key={field.name} field={field} value={val} onChange={handleChange} />
          if (field.type === 'rating') return <RatingField key={field.name} field={field} value={val} onChange={handleChange} />
          if (field.type === 'select') return <SelectField key={field.name} field={field} value={val} onChange={handleChange} />
          return null
        })}
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-xl text-sm border animate-fade-in"
          style={{ background: 'rgba(244,63,94,0.08)', borderColor: 'rgba(244,63,94,0.3)', color: 'var(--color-rose)' }}
        >
          ⚠️ {error} — make sure your backend is running on port 8000.
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between animate-fade-up">
        <Button variant="secondary" onClick={handleBack} disabled={step === 0}>
          ← Back
        </Button>
        {isLast ? (
          <Button onClick={handleSubmit} className="min-w-40">
            Get My Results →
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next →
          </Button>
        )}
      </div>
    </main>
  )
}
