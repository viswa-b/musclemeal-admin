import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import LoginPage    from '../pages/auth/LoginPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import OrdersPage   from '../pages/orders/OrdersPage'
import MealsPage    from '../pages/meals/MealsPage'
import UsersPage    from '../pages/users/UsersPage'
import HoursPage    from '../pages/settings/HoursPage'
import ProtectedRoute from './ProtectedRoute'

import Sidebar from '../components/common/Sidebar'
import Topbar  from '../components/common/Topbar'

function AdminLayout({ children, pageTitle }) {
  return (
    <div className='admin-shell'>
      <Sidebar />
      <div className='admin-main'>
        <Topbar title={pageTitle} />
        <div className='admin-content'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public */}
      <Route
        path='/login'
        element={user ? <Navigate to='/' replace /> : <LoginPage />}
      />

      {/* Protected admin pages */}
      <Route path='/' element={
        <ProtectedRoute>
          <AdminLayout pageTitle='Dashboard'>
            <DashboardPage />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path='/orders' element={
        <ProtectedRoute>
          <AdminLayout pageTitle='Orders'>
            <OrdersPage />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path='/meals' element={
        <ProtectedRoute>
          <AdminLayout pageTitle='Meals'>
            <MealsPage />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path='/users' element={
        <ProtectedRoute>
          <AdminLayout pageTitle='Users'>
            <UsersPage />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path='/hours' element={
        <ProtectedRoute>
          <AdminLayout pageTitle='Hours'>
            <HoursPage />
          </AdminLayout>
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}