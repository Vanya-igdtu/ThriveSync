import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'

const features = [
  { icon: '🔥', title: 'Burnout Prediction', desc: 'ML model trained on Gen Z lifestyle data predicts your burnout risk in seconds.' },
  { icon: '💡', title: 'SHAP Explanations', desc: 'See exactly which habits are driving your score — no black boxes.' },
  { icon: '🧬', title: 'Digital Persona', desc: 'Get clustered into one of 4 personas based on your digital lifestyle patterns.' },
  { icon: '📈', title: 'Wellbeing Score', desc: 'A single composite score that tracks your mental and digital wellness over time.' },
  { icon: '🎯', title: 'Recommendations', desc: 'Personalised, actionable steps to reduce burnout and improve your habits.' },
  { icon: '🗂️', title: 'History Tracking', desc: 'Track your progress across assessments with trend charts and history.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <section className="py-20 flex flex-col items-center text-center gap-8 animate-fade-up">
        <span
          className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border"
          style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)', background: 'var(--color-accent-glow)' }}
        >
          Gen Z · Digital Wellness · Explainable AI
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold leading-tight max-w-3xl">
          Predict burnout.{' '}
          <span style={{ color: 'var(--color-accent)' }}>Improve wellbeing.</span>{' '}
          Thrive smarter.
        </h1>

        <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          An explainable AI platform that predicts burnout risk, measures wellbeing,
          and delivers personalized wellness recommendations for Gen Z.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate('/assessment')} className="text-base px-8 py-4 animate-pulse-glow">
            Take the Assessment →
          </Button>
          <Button variant="secondary" onClick={() => navigate('/history')}>
            View History
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-4 stagger">
          {[
            { value: '~10K', label: 'Training Samples' },
            { value: '20+', label: 'Features Analysed' },
            { value: '4', label: 'Digital Personas' },
            { value: 'SHAP', label: 'Explainability' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center animate-fade-up">
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: 'var(--color-border)' }} />

      {/* Features grid */}
      <section className="py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-10" style={{ color: 'var(--color-muted)' }}>
          What ThriveSync does
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 stagger">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border p-5 space-y-2 card-hover animate-fade-up"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <span className="text-2xl">{icon}</span>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mb-16">
        <div
          className="rounded-2xl border p-10 text-center space-y-4"
          style={{
            background: 'linear-gradient(135deg, rgba(124,108,252,0.1), rgba(45,212,191,0.05))',
            borderColor: 'var(--color-accent)',
          }}
        >
          <h2 className="text-2xl font-bold">Ready to find out your burnout risk?</h2>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Takes less than 3 minutes. No sign-up required.
          </p>
          <Button onClick={() => navigate('/assessment')} className="text-base px-8 py-4">
            Start Now →
          </Button>
        </div>
      </section>

    </main>
  )
}
