/**
 * Format 24h time ("08:00") to 12h ("8:00 AM").
 */
export function fmt12(time) {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const ampm   = h >= 12 ? 'PM' : 'AM'
  const hr     = h % 12 || 12
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`
}

/**
 * Format a date-time string to readable short form.
 */
export function fmtDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString([], {
    day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Format a date string to short date.
 */
export function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString([], {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

/**
 * Format currency in INR.
 */
export function fmtCurrency(amount) {
  return `₹${parseFloat(amount || 0).toFixed(2)}`
}

/**
 * Format a number with commas.
 */
export function fmtNumber(n) {
  return Number(n || 0).toLocaleString('en-IN')
}