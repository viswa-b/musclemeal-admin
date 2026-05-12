/**
 * Parse order_items.notes JSON (stores addons + special note).
 * Falls back gracefully if notes is plain text or null.
 */
export function parseItemNotes(notesStr) {
  if (!notesStr) return { addons: [], note: '' }
  try {
    const parsed = JSON.parse(notesStr)
    return {
      addons: Array.isArray(parsed.addons) ? parsed.addons : [],
      note:   parsed.note || '',
    }
  } catch {
    return { addons: [], note: notesStr }
  }
}

/**
 * Get next status in the flow, or null if already last.
 */
export function getNextStatus(current) {
  const FLOW = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered']
  const idx  = FLOW.indexOf(current)
  return idx >= 0 && idx < FLOW.length - 1 ? FLOW[idx + 1] : null
}

/**
 * Check if shop should be open based on hours.
 */
export function shouldShopBeOpen(openTime = '08:00', closeTime = '21:00') {
  const now   = new Date()
  const h     = now.getHours()
  const m     = now.getMinutes()
  const cur   = h * 60 + m
  const [oh, om] = openTime.split(':').map(Number)
  const [ch, cm] = closeTime.split(':').map(Number)
  return cur >= oh * 60 + om && cur < ch * 60 + cm
}

/**
 * Build initials from a name or email.
 */
export function getInitials(nameOrEmail = '') {
  return nameOrEmail.charAt(0).toUpperCase() || '?'
}