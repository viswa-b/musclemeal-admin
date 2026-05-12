import { db } from './supabase'

export const mealService = {
  async fetchAll() {
    const { data, error } = await db.from('meals').select('*').order('id')
    if (error) throw error
    return data || []
  },

  async create(payload) {
    const { data, error } = await db.from('meals').insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { error } = await db.from('meals').update(payload).eq('id', id)
    if (error) throw error
  },

  async remove(id) {
    const { error } = await db.from('meals').delete().eq('id', id)
    if (error) throw error
  },

  async toggleAvailability(id, isAvailable) {
    const { error } = await db
      .from('meals')
      .update({ is_available: isAvailable })
      .eq('id', id)
    if (error) throw error
  },
}