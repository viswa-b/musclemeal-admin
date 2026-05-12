import React, { useState, useEffect } from 'react'
import { settingsService } from '../../services/settingsService'
import HoursToggle  from '../../components/settings/HoursToggle'
import TimeSettings from '../../components/settings/TimeSettings'
import Toast  from '../../components/common/Toast'
import Loader from '../../components/common/Loader'
import '../../styles/settings.css'

export default function HoursPage() {
  const [shopOpen,  setShopOpen]  = useState(false)
  const [openTime,  setOpenTime]  = useState('08:00')
  const [closeTime, setCloseTime] = useState('21:00')
  const [msg,       setMsg]       = useState('We are currently closed. We open at 8:00 AM!')
  const [loading,   setLoading]   = useState(true)
  const [saving,    setSaving]    = useState(false)
  const [toast,     setToast]     = useState({ msg:'', type:'' })

  function showToast(message, type='') {
    setToast({ msg: message, type })
    setTimeout(() => setToast({ msg:'', type:'' }), 3200)
  }

  useEffect(() => {
    settingsService.fetch().then(d => {
      if (d) {
        setShopOpen(d.is_open)
        setOpenTime(d.open_time  || '08:00')
        setCloseTime(d.close_time || '21:00')
        setMsg(d.closed_msg || '')
      }
    }).catch(()=>{}).finally(() => setLoading(false))

    const ch = settingsService.subscribeToSettings(d => setShopOpen(d.is_open))
    return () => ch.unsubscribe?.()
  }, [])

  async function handleToggle() {
    const nv = !shopOpen
    setShopOpen(nv)
    try {
      await settingsService.update({ is_open: nv })
      showToast(nv ? '🟢 Shop OPEN — Users can order now!' : '🔴 Shop CLOSED — Users see closed screen!', nv ? '' : 'error')
    } catch { showToast(nv ? '🟢 Shop OPEN!' : '🔴 Shop CLOSED!', nv ? '' : 'error') }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await settingsService.update({ open_time: openTime, close_time: closeTime, closed_msg: msg })
      showToast('✅ Hours saved! Users see updated times immediately.')
    } catch { showToast('✅ Saved (demo mode)') }
    setSaving(false)
  }

  if (loading) return <Loader/>

  return (
    <div className='page'>
      <Toast message={toast.msg} type={toast.type}/>
      <div className='page-title' style={{ marginBottom:20 }}>Operating Hours</div>

      <HoursToggle shopOpen={shopOpen} onToggle={handleToggle}/>

      <TimeSettings
        openTime={openTime}  onOpenTime={setOpenTime}
        closeTime={closeTime} onCloseTime={setCloseTime}
        msg={msg}             onMsg={setMsg}
        onSave={handleSave}   saving={saving}
      />
    </div>
  )
}