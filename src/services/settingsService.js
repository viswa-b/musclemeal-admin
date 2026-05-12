import { db } from './supabase'

export const settingsService = {
  async fetch() {
    const { data, error } = await db
      .from('shop_settings')
      .select('*')
      .eq('id', 1)
      .single()
    if (error) throw error
    return data
  },

  async update(payload) {
    const { error } = await db
      .from('shop_settings')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', 1)
    if (error) throw error
  },

  subscribeToSettings(callback) {
    return db
      .channel('shop-settings-channel')
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public',
        table: 'shop_settings', filter: 'id=eq.1',
      }, payload => callback(payload.new))
      .subscribe()
  },
}