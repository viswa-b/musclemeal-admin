import React from 'react'
import { STATUS_NAMES } from '../../utils/constants'
import { fmtCurrency, fmtDateTime } from '../../utils/formatters'
import { getInitials } from '../../utils/helpers'

export default function RecentOrdersTable({ orders }) {
  const recent = orders.slice(0, 8)

  return (
    <div className='table-card'>
      <div className='table-header'>
        <div className='table-title'>Recent Orders</div>
        {orders.filter(o=>o.status==='pending').length > 0 && (
          <span className='badge badge-new'>
            🔴 {orders.filter(o=>o.status==='pending').length} NEW
          </span>
        )}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(o => (
              <tr key={o.id}>
                <td><span className='order-id'>#{o.order_number}</span></td>
                <td>
                  <div className='customer-cell'>
                    <div className='customer-avatar'>{getInitials(o.customer_name)}</div>
                    <div>
                      <div className='customer-name'>{o.customer_name || 'Customer'}</div>
                      <div className='customer-email'>{o.customer_email || ''}</div>
                    </div>
                  </div>
                </td>
                <td><strong>{fmtCurrency(o.total)}</strong></td>
                <td><span className={`badge badge-${o.status}`}>{STATUS_NAMES[o.status] || o.status}</span></td>
                <td><span className='badge badge-paid'>{o.payment_method?.toUpperCase() || '—'}</span></td>
                <td style={{ color: 'var(--MU)', fontSize: 12 }}>{fmtDateTime(o.created_at)}</td>
              </tr>
            ))}
            {!recent.length && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 38, color: 'var(--MU)' }}>No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}