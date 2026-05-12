import { useState, useEffect, useCallback } from 'react'
import { orderService } from '../services/orderService'
import { useOrderContext } from '../context/OrderContext'

export function useOrders() {
  const { orders, setAllOrders, addOrder, updateOrder } = useOrderContext()
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await orderService.fetchAll()
      setAllOrders(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [setAllOrders])

  useEffect(() => { load() }, [load])

  return { orders, loading, error, reload: load }
}