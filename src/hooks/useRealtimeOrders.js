import { useEffect } from 'react'
import { orderService } from '../services/orderService'
import { useOrderContext } from '../context/OrderContext'
import { db } from '../services/supabase'

/**
 * Subscribes to Supabase Realtime for orders table.
 * - New orders from users appear instantly in admin.
 * - Status changes (from admin) update in real-time.
 */
export function useRealtimeOrders(onNewOrder) {
  const { addOrder, updateOrder } = useOrderContext()

  useEffect(() => {
    const channel = db.channel('admin-rt-orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' },
        payload => {
          const newOrder = {
            ...payload.new,
            customer_name:  'New Customer',
            customer_email: '',
          }
          addOrder(newOrder)
          onNewOrder?.(newOrder)
        }
      )
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' },
        payload => {
          updateOrder(payload.new.id, payload.new)
        }
      )
      .subscribe()

    return () => db.removeChannel(channel)
  }, [addOrder, updateOrder, onNewOrder])
}