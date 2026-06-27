// ── Card ──────────────────────────────────────────────────
export function Card({ children, className = '', glow = false, hover = false }) {
  return (
    <div
      className={`rounded-2xl border p-6 animate-fade-up ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: glow ? '0 0 32px var(--color-accent-glow)' : 'none',
      }}
    >
      {children}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────
export function Badge({ children, color = 'var(--color-accent)', bg }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        color,
        background: bg || `${color}22`,
        border: `1px solid ${color}44`,
      }}
    >
      {children}
    </span>
  )
}

// ── Button ────────────────────────────────────────────────
export function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95'
  const variants = {
    primary: 'text-white hover:brightness-110',
    secondary: 'text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
    ghost: 'text-[var(--color-muted)] hover:text-[var(--color-text)]',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === 'primary' ? { background: 'var(--color-accent)' } : {}}
    >
      {children}
    </button>
  )
}

// ── Spinner ───────────────────────────────────────────────
export function Spinner({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ color: 'var(--color-accent)' }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="48" strokeDashoffset="12" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// ── ProgressBar ───────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'var(--color-accent)' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-surface-2)' }}>
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

// ── SectionLabel ─────────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>
      {children}
    </p>
  )
}

// ── Skeleton ──────────────────────────────────────────────
export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

// ── PageLoader ────────────────────────────────────────────
export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center gap-4 animate-fade-in">
      <Spinner size={36} />
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{message}</p>
    </div>
  )
}

// ── ErrorState ────────────────────────────────────────────
export function ErrorState({ message, onRetry }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-fade-in space-y-4">
      <p className="text-4xl">⚠️</p>
      <p className="text-sm" style={{ color: 'var(--color-rose)' }}>{message}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry}>Try Again</Button>}
    </div>
  )
}

// ── EmptyState ────────────────────────────────────────────
export function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-fade-in space-y-4">
      <p className="text-5xl">{icon}</p>
      <h2 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h2>
      {description && <p style={{ color: 'var(--color-muted)' }}>{description}</p>}
      {action}
    </div>
  )
}
