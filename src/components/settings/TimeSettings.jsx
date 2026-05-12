import React from 'react'
import { fmt12 } from '../../utils/formatters'
import '../../styles/settings.css'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function TimeSettings({ openTime, closeTime, msg, onOpenTime, onCloseTime, onMsg, onSave, saving }) {
  const todayIdx = (new Date().getDay() + 6) % 7 // Mon=0

  return (
    <>
      {/* Time inputs */}
      <div className='settings-card'>
        <div className='settings-card-title'>⏰ Set Shop Timings</div>
        <div className='time-inputs'>
          <div className='field-group' style={{marginBottom:0}}>
            <label className='field-label'>Opening Time</label>
            <input className='field-input' type='time' value={openTime} onChange={e => onOpenTime(e.target.value)} style={{fontSize:16}}/>
            <div className='time-hint'>= {fmt12(openTime)}</div>
          </div>
          <div className='field-group' style={{marginBottom:0}}>
            <label className='field-label'>Closing Time</label>
            <input className='field-input' type='time' value={closeTime} onChange={e => onCloseTime(e.target.value)} style={{fontSize:16}}/>
            <div className='time-hint'>= {fmt12(closeTime)}</div>
          </div>
        </div>
        <div className='field-group' style={{marginTop:14}}>
          <label className='field-label'>Closed Message (shown to users)</label>
          <input className='field-input' value={msg} onChange={e => onMsg(e.target.value)} placeholder='We are currently closed…'/>
        </div>
        <button className='btn btn-primary' onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : '💾 Save Hours & Message'}
        </button>
      </div>

      {/* Preview */}
      <div className='settings-card'>
        <div className='settings-card-title'>👁️ What Users See When Closed</div>
        <div className='preview-box'>
          <div className='preview-ico'>🔒</div>
          <div className='preview-tit'>Shop is Closed</div>
          <div className='preview-sub'>{msg || 'We are currently closed!'}</div>
          <div className='preview-hours'>
            🕐 Opens <span className='preview-time'>{fmt12(openTime)}</span>
            &nbsp;· Closes <span className='preview-time'>{fmt12(closeTime)}</span>
          </div>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className='settings-card'>
        <div className='settings-card-title'>Weekly Schedule</div>
        <div className='week-grid'>
          {DAYS.map((d, i) => {
            const isToday  = i === todayIdx
            const isOpen   = d !== 'Sunday'
            return (
              <div key={d} className={`week-day${isToday?' today':''}`}>
                <div className='week-day-name'>{d.slice(0,3)}</div>
                <div className={`week-day-status ${isOpen?'open':'closed'}`}>{isOpen?'Open':'Off'}</div>
                {isOpen && <div className='week-day-time'>{fmt12(openTime).replace(':00','')}-{fmt12(closeTime).replace(':00','')}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}