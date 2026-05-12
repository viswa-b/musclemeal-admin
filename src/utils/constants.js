export const STATUS_FLOW = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
]

export const STATUS_NAMES = {
  pending:          'Pending',
  confirmed:        'Confirmed',
  preparing:        'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered:        'Delivered',
  cancelled:        'Cancelled',
}

export const TRACK_LABELS = {
  pending:          { label: 'Order Placed',    icon: '📋' },
  confirmed:        { label: 'Order Confirmed', icon: '✅' },
  preparing:        { label: 'Being Prepared',  icon: '👨‍🍳' },
  out_for_delivery: { label: 'Out for Delivery', icon: '🚴' },
  delivered:        { label: 'Delivered!',      icon: '🎉' },
  cancelled:        { label: 'Cancelled',       icon: '❌' },
}

export const CATEGORY_LABELS = {
  veg:    '🌿 Veg',
  nonveg: '🥩 Non-Veg',
  vegan:  '🌱 Vegan',
}

export const SECTION_LABELS = {
  meals:     'Meals',
  snacks:    'Snacks',
  breakfast: 'Breakfast',
  drinks:    'Drinks',
}

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard'  },
  { id: 'orders',    label: 'Orders'     },
  { id: 'meals',     label: 'Meals'      },
  { id: 'users',     label: 'Users'      },
  { id: 'hours',     label: 'Hours'      },
]