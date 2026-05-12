import React, { useState } from 'react'
import { STATUS_NAMES } from '../../utils/constants'
import { fmtCurrency, fmtDateTime } from '../../utils/formatters'
import { getInitials, parseItemNotes } from '../../utils/helpers'
import { orderService } from '../../services/orderService'
import OrderStatusFlow from './OrderStatusFlow'
import '../../styles/orders.css'

function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const addr = order.delivery_address || {}

  React.useEffect(() => {
    orderService.fetchItems(order.id)
      .then(d => setItems(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [order.id])

  return (
    <div className='modal-overlay' onClick={e => e.target === e.currentTarget && onClose()}>
      <div className='modal-box' style={{ maxWidth: 640 }}>
        <div className='modal-header'>
          <div className='modal-title'>Order #{order.order_number}</div>
          <button className='modal-close' onClick={onClose}>✕</button>
        </div>
        <div className='modal-body'>

          {/* Status flow */}
          <div className='od-section'>
            <div className='od-label'>Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className={`badge badge-${order.status}`}>{STATUS_NAMES[order.status]}</span>
              <OrderStatusFlow order={order} onUpdate={onStatusChange}/>
            </div>
          </div>

          {/* Delivery info */}
          <div className='od-section'>
            <div className='od-label'>Customer & Delivery</div>
            <div className='od-address-box'>
              <div style={{ marginBottom: 9 }}>
                <div style={{ fontWeight: 700 }}>{order.customer_name || 'Customer'}</div>
                <div style={{ fontSize: 13, color: 'var(--MU)' }}>{order.customer_email}</div>
              </div>
              {addr.name && <div className='od-addr-name'>{addr.name}<span className='od-addr-type'>{addr.label || 'Home'}</span></div>}
              {(addr.text || addr.mapAddr) && <div className='od-addr-text'>📍 {addr.text || addr.mapAddr}</div>}
              {addr.phone && <div className='od-addr-phone'>📞 +91 {addr.phone}</div>}
            </div>
          </div>

          {/* Items with addons */}
          <div className='od-section'>
            <div className='od-label'>Items Ordered (with Add-ons)</div>
            {loading && <div style={{ color: 'var(--MU)', fontSize: 13 }}>Loading items…</div>}
            {!loading && items.map((item, i) => {
              const { addons, note } = parseItemNotes(item.notes)
              return (
                <div key={i} className='od-item'>
                  <div className='od-item-row'>
                    <div>
                      <div className='od-item-name'>{item.meal_name} × {item.qty}</div>
                      {item.meal_img && <img src={item.meal_img} alt='' style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', marginTop: 4 }} onError={e => e.target.style.display='none'}/>}
                    </div>
                    <div className='od-item-price'>{fmtCurrency(parseFloat(item.unit_price||0)*item.qty)}</div>
                  </div>
                  {addons.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--MU)', textTransform: 'uppercase', letterSpacing: .7, marginBottom: 5 }}>Add-ons</div>
                      <div className='od-addons'>
                        {addons.map((a, ai) => (
                          <span key={ai} className='od-addon-chip'>
                            {a.em || ''} {a.name} ×{a.qty} (+₹{a.price * a.qty})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {note && <div className='od-note'>📝 {note}</div>}
                </div>
              )
            })}
          </div>

          {/* Bill */}
          <div>
            <div className='od-label'>Payment</div>
            <div style={{ background: 'var(--bg3)', borderRadius: 10, padding: 14 }}>
              <div className='od-bill-row'><span className='od-bill-lbl'>Subtotal</span><span>{fmtCurrency(order.subtotal)}</span></div>
              <div className='od-bill-row'><span className='od-bill-lbl'>Delivery</span><span style={parseFloat(order.delivery_fee||0)===0?{color:'var(--G)',fontWeight:700}:{}}>{parseFloat(order.delivery_fee||0)===0?'FREE':fmtCurrency(order.delivery_fee)}</span></div>
              {parseFloat(order.discount||0) > 0 && <div className='od-bill-row'><span className='od-bill-lbl'>Discount</span><span style={{color:'var(--R)'}}>-{fmtCurrency(order.discount)}</span></div>}
              <div className='od-bill-row'><span>Total Paid</span><span style={{color:'var(--P)'}}>{fmtCurrency(order.total)}</span></div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--MU)' }}>
                Method: <strong style={{color:'var(--TX)'}}>{order.payment_method}</strong> · <span style={{color:order.payment_status==='paid'?'var(--G)':'var(--Y)'}}>{order.payment_status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button className='btn btn-ghost' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function OrderTable({ orders, onStatusUpdate }) {
  const [viewOrder, setView] = useState(null)

  return (
    <>
      <div className='table-card'>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Items</th><th>Total</th>
                <th>Payment</th><th>Status</th>
                <th style={{ minWidth: 330 }}>Update Status ⚡</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>
                    <span className='order-id'>#{o.order_number}</span><br/>
                    <span style={{ fontSize: 11, color: 'var(--MU)' }}>{fmtDateTime(o.created_at)}</span>
                  </td>
                  <td>
                    <div className='customer-cell'>
                      <div className='customer-avatar'>{getInitials(o.customer_name)}</div>
                      <div>
                        <div className='customer-name'>{o.customer_name || 'Customer'}</div>
                        <div className='customer-email'>{o.customer_email || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--MU)' }}>{o.items_count || '—'}</td>
                  <td><strong>{fmtCurrency(o.total)}</strong></td>
                  <td>
                    <span className={`badge ${o.payment_status==='paid'?'badge-paid':'badge-pending-pay'}`}>{o.payment_status==='paid'?'✓ Paid':'Pending'}</span><br/>
                    <span style={{ fontSize: 10, color: 'var(--MU)' }}>{o.payment_method}</span>
                  </td>
                  <td><span className={`badge badge-${o.status}`}>{STATUS_NAMES[o.status]}</span></td>
                  <td><OrderStatusFlow order={o} onUpdate={onStatusUpdate}/></td>
                  <td><button className='btn btn-ghost btn-sm' onClick={() => setView(o)}>👁 View</button></td>
                </tr>
              ))}
              {!orders.length && (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 38, color: 'var(--MU)' }}>No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='orders-legend'>
        <span>🟡 Yellow = click to advance to next step</span>
        <span>🟠 Orange = current status</span>
        <span>✓ = completed</span>
        <span>⚡ User sees change instantly via Realtime</span>
      </div>

      {viewOrder && (
        <OrderDetailModal
          order={viewOrder}
          onClose={() => setView(null)}
          onStatusChange={(id, s) => { onStatusUpdate(id, s); setView(prev => ({...prev, status:s})); }}
        />
      )}
    </>
  )
}