import React from 'react'
import { STATUS_FLOW, STATUS_NAMES } from '../../utils/constants'
import { getNextStatus } from '../../utils/helpers'
import '../../styles/orders.css'

export default function OrderStatusFlow({ order, onUpdate }) {
  if (['delivered','cancelled'].includes(order.status)) {
    return (
      <span className={`badge badge-${order.status}`}>
        {order.status === 'delivered' ? '✓ Done' : '✗ Cancelled'}
      </span>
    )
  }

  const nextStatus = getNextStatus(order.status)
  const statusIdx  = STATUS_FLOW.indexOf(order.status)

  return (
    <div className='status-flow'>
      {STATUS_FLOW.map((s, i) => {
        const done = i < statusIdx
        const curr = s === order.status
        const next = s === nextStatus
        return (
          <button
            key={s}
            className={`flow-btn ${curr ? 'current' : next ? 'next' : done ? 'done' : ''}`}
            onClick={() => next && onUpdate(order.id, s)}
            disabled={done || (!curr && !next)}
            title={next ? `Mark as ${STATUS_NAMES[s]}` : STATUS_NAMES[s]}
          >
            {done ? '✓ ' : ''}{STATUS_NAMES[s]}
          </button>
        )
      })}
      <button className='flow-btn cancel' onClick={() => onUpdate(order.id, 'cancelled')}>
        ✕ Cancel
      </button>
    </div>
  )
}