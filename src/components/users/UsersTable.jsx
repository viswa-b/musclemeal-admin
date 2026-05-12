import React from 'react'
import { fmtDate } from '../../utils/formatters'
import { getInitials } from '../../utils/helpers'
import '../../styles/users.css'

export default function UsersTable({ users }) {
  return (
    <div className='table-card'>
      <table>
        <thead>
          <tr><th>User</th><th>Email</th><th>Meals Logged</th><th>Plan</th><th>Joined</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>
                <div className='customer-cell'>
                  <div className='customer-avatar'>{getInitials(u.full_name || u.email)}</div>
                  <div className='customer-name'>{u.full_name || '—'}</div>
                </div>
              </td>
              <td style={{ color: 'var(--MU)', fontSize: 13 }}>{u.email}</td>
              <td>{u.meals_logged || 0}</td>
              <td>
                {u.is_pro
                  ? <span className='badge badge-paid'>⭐ Pro</span>
                  : <span className='badge badge-cancelled'>Free</span>
                }
              </td>
              <td style={{ color: 'var(--MU)', fontSize: 12 }}>{fmtDate(u.created_at)}</td>
            </tr>
          ))}
          {!users.length && (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: 38, color: 'var(--MU)' }}>No users yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}