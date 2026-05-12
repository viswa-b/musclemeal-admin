import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { path: '/',       label: 'Dashboard', icon: '⊞' },
  { path: '/orders', label: 'Orders',    icon: '📦' },
  { path: '/meals',  label: 'Meals',     icon: '🍽️' },
  { path: '/users',  label: 'Users',     icon: '👥' },
  { path: '/hours',  label: 'Hours',     icon: '⏰' },
]

export default function Sidebar({ pendingCount = 0 }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/login')
  }

  const initials = (user?.email || 'A')[0].toUpperCase()

  return (
    <aside style={{
      width: 'var(--SW)', background: 'var(--bg2)',
      borderRight: '1px solid var(--bo)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--bo)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
          <div style={{ width: 34, height: 34, background: 'var(--P)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--FD)', fontSize: 18, color: '#fff' }}>M</div>
          <div style={{ fontFamily: 'var(--FD)', fontSize: 20, color: 'var(--TX)', letterSpacing: 1 }}>MuscleMeals</div>
        </div>
        <span style={{ display: 'inline-block', background: 'var(--P)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>ADMIN PANEL</span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '13px 11px', flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.4px', color: 'var(--MU)', padding: '0 8px', margin: '0 0 7px' }}>Navigation</div>
        {NAV.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '9px 11px', borderRadius: 'var(--RR)',
              color: isActive ? 'var(--P)' : 'var(--MU)',
              background: isActive ? 'rgba(255,69,0,.14)' : 'none',
              fontSize: 14, fontWeight: 500, marginBottom: 2,
              textDecoration: 'none', transition: 'all .15s',
              position: 'relative',
              borderLeft: isActive ? '3px solid var(--P)' : '3px solid transparent',
            })}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
            {item.label === 'Orders' && pendingCount > 0 && (
              <span style={{ marginLeft: 'auto', background: 'var(--P)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, animation: 'blink 1.5s infinite' }}>
                {pendingCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '13px 11px', borderTop: '1px solid var(--bo)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', marginBottom: 7 }}>
          <div style={{ width: 33, height: 33, borderRadius: '50%', background: 'var(--P)', color: '#fff', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{initials}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.user_metadata?.full_name || 'Admin'}</div>
            <div style={{ fontSize: 11, color: 'var(--MU)' }}>Administrator</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 7, padding: '9px 11px', borderRadius: 'var(--RR)', color: 'var(--R)', fontSize: 14, fontWeight: 600, background: 'rgba(255,23,68,.08)' }}
        >
          ← Sign Out
        </button>
      </div>
    </aside>
  )
}