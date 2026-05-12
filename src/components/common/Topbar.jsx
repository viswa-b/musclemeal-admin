import React from 'react'
import { fmt12 } from '../../utils/formatters'

export default function Topbar({ title, shopOpen = false, shopTimes = {} }) {
  const close = shopTimes.close_time || '21:00'
  const open  = shopTimes.open_time  || '08:00'

  return (
    <div style={{
      height: 62, background: 'var(--bg2)',
      borderBottom: '1px solid var(--bo)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 26px', flexShrink: 0,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ fontFamily: 'var(--FD)', fontSize: 26, letterSpacing: '.5px' }}>{title}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        {/* Realtime indicator */}
        <div className='rt-indicator'>
          <div className='rt-dot'/>
          Realtime Active
        </div>

        {/* Shop status pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 13px', borderRadius: 30, fontSize: 12, fontWeight: 600,
          background: shopOpen ? 'rgba(0,200,83,.12)' : 'rgba(255,23,68,.12)',
          color: shopOpen ? 'var(--G)' : 'var(--R)',
          border: shopOpen ? '1px solid rgba(0,200,83,.2)' : '1px solid rgba(255,23,68,.2)',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: shopOpen ? 'var(--G)' : 'var(--R)', animation: shopOpen ? 'pulse 2s infinite' : 'none' }}/>
          {shopOpen ? `Open until ${fmt12(close)}` : `Opens at ${fmt12(open)}`}
        </div>
      </div>
    </div>
  )
}