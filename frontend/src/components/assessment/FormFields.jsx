// ── SliderField ───────────────────────────────────────────
export function SliderField({ field, value, onChange }) {
  const pct = ((value - field.min) / (field.max - field.min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          {field.label}
        </label>
        <span
          className="text-sm font-bold tabular-nums px-3 py-0.5 rounded-lg"
          style={{ background: 'var(--color-accent-glow)', color: 'var(--color-accent)' }}
        >
          {value} {field.unit}
        </span>
      </div>

      {field.hint && (
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{field.hint}</p>
      )}

      <div className="relative">
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={(e) => onChange(field.name, parseFloat(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${pct}%, var(--color-surface-2) ${pct}%)`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs" style={{ color: 'var(--color-muted)' }}>
        <span>{field.min}</span>
        <span>{field.max}</span>
      </div>
    </div>
  )
}

// ── RatingField ───────────────────────────────────────────
export function RatingField({ field, value, onChange }) {
  const dots = Array.from({ length: field.max - field.min + 1 }, (_, i) => i + field.min)

  // Color shifts from teal → amber → rose based on field
  const isNegative = ['Anxiety_Score', 'Loneliness_Score'].includes(field.name)

  const getColor = (dot) => {
    const active = dot <= value
    if (!active) return 'var(--color-surface-2)'
    if (isNegative) {
      if (dot <= 3) return 'var(--color-teal)'
      if (dot <= 6) return 'var(--color-amber)'
      return 'var(--color-rose)'
    } else {
      if (dot <= 3) return 'var(--color-rose)'
      if (dot <= 6) return 'var(--color-amber)'
      return 'var(--color-teal)'
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          {field.label}
        </label>
        <span
          className="text-sm font-bold tabular-nums px-3 py-0.5 rounded-lg"
          style={{ background: 'var(--color-accent-glow)', color: 'var(--color-accent)' }}
        >
          {value}{field.unit}
        </span>
      </div>

      {field.hint && (
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{field.hint}</p>
      )}

      <div className="flex gap-2 flex-wrap">
        {dots.map((dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => onChange(field.name, dot)}
            className="w-9 h-9 rounded-lg text-xs font-semibold transition-all duration-100 hover:scale-110 active:scale-95"
            style={{
              background: getColor(dot),
              color: dot <= value ? '#fff' : 'var(--color-muted)',
              border: dot === value ? '2px solid rgba(255,255,255,0.4)' : '2px solid transparent',
            }}
          >
            {dot}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── SelectField ───────────────────────────────────────────
export function SelectField({ field, value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          {field.label}
        </label>
      </div>

      {field.hint && (
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{field.hint}</p>
      )}

      <div className="flex flex-col gap-2">
        {field.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(field.name, opt.value)}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-100 border"
            style={{
              background: value === opt.value ? 'var(--color-accent-glow)' : 'var(--color-surface-2)',
              borderColor: value === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
              color: value === opt.value ? 'var(--color-accent)' : 'var(--color-text)',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
