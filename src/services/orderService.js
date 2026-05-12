import { db } from './supabase'

export const orderService = {
  async fetchAll() {
    const { data, error } = await db
      .from('orders')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data || []).map(o => ({
      ...o,
      customer_name:  o.profiles?.full_name  || 'Customer',
      customer_email: o.profiles?.email       || '',
    }))
  },

  async fetchItems(orderId) {
    const { data, error } = await db
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
    if (error) throw error
    return data || []
  },

  async updateStatus(orderId, status) {
    const { error } = await db
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
    if (error) throw error
  },

  subscribeToOrders(onInsert, onUpdate) {
    return db
      .channel('admin-orders-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => onInsert(payload.new))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, payload => onUpdate(payload.new))
      .subscribe()
  },
}