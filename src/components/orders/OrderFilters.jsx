import React from 'react'
import { STATUS_NAMES } from '../../utils/constants'
import '../../styles/orders.css'

const FILTERS = ['all','pending','confirmed','preparing','out_for_delivery','delivered','cancelled']

export default function OrderFilters({ orders, activeFilter, onFilter, search, onSearch }) {
  return (
    <div className='orders-filters'>
      {FILTERS.map(f => (
        <button
          key={f}
          className={`btn btn-sm ${activeFilter === f ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onFilter(f)}
        >
          {f === 'all'
            ? `All (${orders.length})`
            : `${STATUS_NAMES[f] || f} (${orders.filter(o=>o.status===f).length})`
          }
        </button>
      ))}
      <input
        className='order-search'
        placeholder='Search orders…'
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  )
}