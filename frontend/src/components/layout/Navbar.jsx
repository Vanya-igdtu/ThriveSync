import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/history', label: 'History' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
      style={{ background: 'rgba(13,15,26,0.88)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <span className="text-sm font-bold tracking-tight gradient-text">ThriveSync</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive ? '' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: 'var(--color-accent-glow)', color: 'var(--color-accent)' } : {}
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: 'var(--color-muted)' }} />
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: 'var(--color-muted)' }} />
          <span className="block w-5 h-0.5 rounded transition-all" style={{ background: 'var(--color-muted)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="sm:hidden border-t px-6 py-4 flex flex-col gap-2 animate-fade-in"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? '' : 'text-[var(--color-muted)]'
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: 'var(--color-accent-glow)', color: 'var(--color-accent)' } : {}
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
