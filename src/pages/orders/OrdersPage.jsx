import React, { useState, useCallback } from 'react'
import { useOrders } from '../../hooks/useOrders'
import { useRealtimeOrders } from '../../hooks/useRealtimeOrders'
import { orderService } from '../../services/orderService'
import { useOrderContext } from '../../context/OrderContext'
import OrderFilters from '../../components/orders/OrderFilters'
import OrderTable   from '../../components/orders/OrderTable'
import Toast   from '../../components/common/Toast'
import Loader  from '../../components/common/Loader'
import { STATUS_NAMES } from '../../utils/constants'
import '../../styles/orders.css'

export default function OrdersPage() {
  const { orders, loading } = useOrders()
  const { updateOrder }     = useOrderContext()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [toast, setToast]   = useState({ msg:'', type:'' })

  function showToast(msg, type='') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg:'', type:'' }), 3200)
  }

  const handleNewOrder = useCallback(() => showToast('🆕 New order received!', 'warn'), [])
  useRealtimeOrders(handleNewOrder)

  async function handleStatusUpdate(orderId, newStatus) {
    try {
      await orderService.updateStatus(orderId, newStatus)
    } catch(e) {
      console.warn('Status update failed:', e.message)
    }
    updateOrder(orderId, { status: newStatus })
    showToast(`✅ Order → ${STATUS_NAMES[newStatus]}`)
  }

  const filtered = orders.filter(o => {
    const mf = filter === 'all' || o.status === filter
    const ms = !search || o.order_number?.includes(search) || o.customer_name?.toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  if (loading) return <Loader/>

  return (
    <div className='page'>
      <Toast message={toast.msg} type={toast.type}/>
      <div className='page-header'>
        <div className='page-title'>Order Management</div>
        <div className='rt-indicator'><div className='rt-dot'/>Live Realtime</div>
      </div>
      <OrderFilters
        orders={orders}
        activeFilter={filter}
        onFilter={setFilter}
        search={search}
        onSearch={setSearch}
      />
      <OrderTable orders={filtered} onStatusUpdate={handleStatusUpdate}/>
    </div>
  )
}