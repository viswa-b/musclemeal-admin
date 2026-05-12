import React from 'react'
import { fmt12 } from '../../utils/formatters'
import '../../styles/settings.css'

export default function HoursToggle({ shopOpen, onToggle }) {
  const now = new Date()
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`

  return (
    <div className='settings-card'>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <div>
          <div style={{ fontFamily:'var(--FD)', fontSize:30, marginBottom:3 }}>
            {shopOpen ? '🟢 SHOP IS OPEN' : '🔴 SHOP IS CLOSED'}
          </div>
          <div style={{ color:'var(--MU)', fontSize:14 }}>
            Toggling updates user app <strong style={{color:'var(--P)'}}>instantly</strong> via Realtime
          </div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:'var(--FD)', fontSize:48, color:'var(--P)', lineHeight:1 }}>{timeStr}</div>
          <div style={{ fontSize:13, color:'var(--MU)', marginTop:3 }}>Current Time</div>
        </div>
      </div>

      <div className='shop-control-row'>
        <div className='shop-control-info'>
          <div className='shop-control-desc'>{shopOpen ? 'Click to CLOSE the shop' : 'Click to OPEN the shop'}</div>
          <div className='shop-control-sub'>When closed, users see a "Shop Closed" screen and cannot place orders</div>
        </div>
        <button className={`toggle ${shopOpen ? 'on' : 'off'}`} onClick={onToggle}>
          <div className='toggle-knob'/>
        </button>
      </div>
    </div>
  )
}