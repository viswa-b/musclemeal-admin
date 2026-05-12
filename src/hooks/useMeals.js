import { useState, useEffect, useCallback } from 'react'
import { mealService } from '../services/mealService'

export function useMeals() {
  const [meals,   setMeals]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await mealService.fetchAll()
      setMeals(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addMeal    = m  => setMeals(p => [m, ...p])
  const editMeal   = (id, d) => setMeals(p => p.map(m => m.id === id ? { ...m, ...d } : m))
  const removeMeal = id => setMeals(p => p.filter(m => m.id !== id))

  return { meals, loading, error, reload: load, addMeal, editMeal, removeMeal }
}