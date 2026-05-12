import React from 'react'
import { fmtCurrency } from '../../utils/formatters'
import '../../styles/dashboard.css'

const CARDS = [
  { key: 'total',    label: 'Total Orders',    icon: '📦', color: 'orange', getValue: (o) => o.length },
  { key: 'revenue',  label: 'Revenue',         icon: '💰', color: 'green',  getValue: (o) => fmtCurrency(o.filter(x=>x.status==='delivered').reduce((s,x)=>s+parseFloat(x.total||0),0)) },
  { key: 'active',   label: 'Active Orders',   icon: '⏳', color: 'yellow', getValue: (o) => o.filter(x=>!['delivered','cancelled'].includes(x.status)).length },
  { key: 'pending',  label: 'Pending Now',     icon: '🔔', color: 'blue',   getValue: (o) => o.filter(x=>x.status==='pending').length },
]

export default function DashboardCards({ orders }) {
  return (
    <div className='stats-grid'>
      {CARDS.map(card => (
        <div key={card.key} className={`stat-card ${card.color}`}>
          <div className={`stat-icon ${card.color}`}>{card.icon}</div>
          <div className='stat-value'>{card.getValue(orders)}</div>
          <div className='stat-label'>{card.label}</div>
        </div>
      ))}
    </div>
  )
}