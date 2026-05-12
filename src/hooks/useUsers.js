import { useState, useEffect } from 'react'
import { userService } from '../services/userService'

export function useUsers() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    userService.fetchAll()
      .then(data => setUsers(data))
      .catch(e  => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { users, loading, error }
}