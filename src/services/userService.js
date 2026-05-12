import { db } from './supabase'

export const userService = {
  async fetchAll() {
    const { data, error } = await db
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },
}