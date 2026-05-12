import React from 'react'

export default function Toast({ message, type = '' }) {
  if (!message) return null

  const borderColor = type === 'error' ? 'var(--R)' : type === 'warn' ? 'var(--Y)' : 'var(--G)'
  const icon = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '✅'

  return (
    <div style={{
      position: 'fixed', bottom: 22, right: 22,
      background: 'var(--bg2)', border: '1px solid var(--bo)',
      borderLeft: `4px solid ${borderColor}`,
      borderRadius: 'var(--RR)', padding: '13px 17px',
      fontSize: 14, fontWeight: 600, zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: 9,
      boxShadow: '0 8px 28px rgba(0,0,0,.4)',
      maxWidth: 320, animation: 'slideIn .3s ease',
      color: 'var(--TX)',
    }}>
      {icon} {message}
      <style>{`@keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  )
}