import React, { useState, useEffect, useCallback } from 'react'
import { useOrders } from '../../hooks/useOrders'
import { useRealtimeOrders } from '../../hooks/useRealtimeOrders'
import { settingsService } from '../../services/settingsService'
import DashboardCards from '../../components/dashboard/DashboardCards'
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable'
import Toast from '../../components/common/Toast'
import Loader from '../../components/common/Loader'
import '../../styles/dashboard.css'

export default function DashboardPage() {
  const { orders, loading } = useOrders()
  const [shopOpen, setShopOpen] = useState(false)
  const [toast, setToast]       = useState({ msg:'', type:'' })

  function showToast(msg, type='') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg:'', type:'' }), 3200)
  }

  useEffect(() => {
    settingsService.fetch().then(d => { if(d) setShopOpen(d.is_open) }).catch(()=>{})
    const ch = settingsService.subscribeToSettings(d => setShopOpen(d.is_open))
    return () => ch.unsubscribe?.()
  }, [])

  const handleNewOrder = useCallback(() => showToast('🆕 New order received!', 'warn'), [])
  useRealtimeOrders(handleNewOrder)

  async function toggleShop() {
    const nv = !shopOpen
    setShopOpen(nv)
    try {
      await settingsService.update({ is_open: nv })
      showToast(nv ? '🟢 Shop is now OPEN — Users can order!' : '🔴 Shop is now CLOSED!', nv ? '' : 'error')
    } catch { showToast(nv ? '🟢 Shop OPEN!' : '🔴 Shop CLOSED!', nv ? '' : 'error') }
  }

  if (loading) return <Loader/>

  return (
    <div className='page'>
      <Toast message={toast.msg} type={toast.type}/>
      <DashboardCards orders={orders}/>

      {/* Shop toggle */}
      <div className='shop-control'>
        <div className='shop-control-header'>
          <div className='shop-control-title'>⏰ Shop Control — 8:00 AM to 9:00 PM</div>
          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
            <span style={{ fontWeight:600, fontSize:14 }}>{shopOpen ? '🟢 OPEN' : '🔴 CLOSED'}</span>
            <button className={`toggle ${shopOpen?'on':'off'}`} onClick={toggleShop}>
              <div className='toggle-knob'/>
            </button>
          </div>
        </div>
        <div className='shop-control-row'>
          <div className='shop-control-info'>
            <div className='shop-control-desc'>Manual Override</div>
            <div className='shop-control-sub'>Toggle broadcasts to all users instantly via Supabase Realtime</div>
          </div>
        </div>
      </div>

      <RecentOrdersTable orders={orders}/>
    </div>
  )
}