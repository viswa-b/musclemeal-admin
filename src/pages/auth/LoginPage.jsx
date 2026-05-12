import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/auth.css'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate   = useNavigate()
  const [email, setEmail]     = useState(import.meta.env.VITE_ADMIN_EMAIL || 'admin@musclemeals.com')
  const [password, setPass]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch(err) {
      // Allow demo login
      if (password === 'admin123456') {
        navigate('/')
        return
      }
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-page'>
      <div className='auth-box'>
        <div className='auth-logo'>
          <div className='auth-logo-icon'>M</div>
          <div className='auth-logo-name'>MuscleMeals</div>
        </div>
        <div className='auth-sub'>Admin Panel — Restricted Access 🔐</div>

        <div className='auth-title'>Sign In</div>
        <div className='auth-desc'>Enter your administrator credentials</div>

        {error && <div className='auth-error'>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='field-group'>
            <label className='field-label'>Email</label>
            <input className='field-input' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='admin@musclemeals.com'/>
          </div>
          <div className='field-group'>
            <label className='field-label'>Password</label>
            <input className='field-input' type='password' value={password} onChange={e => setPass(e.target.value)} placeholder='••••••••'/>
          </div>
          <button type='submit' className='btn btn-primary auth-submit' disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className='auth-hint'>Demo password: <strong>admin123456</strong></div>
      </div>
    </div>
  )
}