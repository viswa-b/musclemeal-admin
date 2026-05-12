import React, { createContext, useContext, useState, useCallback } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  const addOrder = useCallback(order => {
    setOrders(prev => [order, ...prev])
  }, [])

  const updateOrder = useCallback((id, updates) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  }, [])

  const setAllOrders = useCallback(list => {
    setOrders(list)
  }, [])

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, setAllOrders }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrderContext() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrderContext must be used inside OrderProvider')
  return ctx
}