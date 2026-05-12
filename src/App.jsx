import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { OrderProvider } from './context/OrderContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <AppRoutes />
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}