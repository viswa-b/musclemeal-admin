import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getSession().then(u => {
      setUser(u)
      setLoading(false)
    })

    const sub = authService.onAuthChange(u => setUser(u))
    return () => sub.unsubscribe()
  }, [])

  async function signIn(email, password) {
    const u = await authService.signIn(email, password)
    setUser(u)
    return u
  }

  async function signOut() {
    await authService.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}