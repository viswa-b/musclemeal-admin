import React from 'react'
import { useUsers } from '../../hooks/useUsers'
import UsersTable from '../../components/users/UsersTable'
import Loader from '../../components/common/Loader'
import '../../styles/users.css'

export default function UsersPage() {
  const { users, loading } = useUsers()

  if (loading) return <Loader/>

  return (
    <div className='page'>
      <div className='page-header'>
        <div className='page-title'>Users</div>
        <span style={{ color:'var(--MU)', fontSize:14 }}>{users.length} registered users</span>
      </div>
      <div className='users-stats'>
        <div className='users-stat-card'><div className='users-stat-val'>{users.length}</div><div className='users-stat-lbl'>Total Users</div></div>
        <div className='users-stat-card'><div className='users-stat-val'>{users.filter(u=>u.is_pro).length}</div><div className='users-stat-lbl'>Pro Members</div></div>
        <div className='users-stat-card'><div className='users-stat-val'>{users.reduce((s,u)=>s+(u.meals_logged||0),0)}</div><div className='users-stat-lbl'>Total Meals Logged</div></div>
      </div>
      <UsersTable users={users}/>
    </div>
  )
}