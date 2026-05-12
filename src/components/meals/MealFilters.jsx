import React from 'react'
import '../../styles/meals.css'

const CATS = ['all','veg','nonveg','vegan']
const SECS = ['all','meals','snacks','breakfast','drinks']

export default function MealFilters({ filter, onFilter, search, onSearch }) {
  return (
    <div className='meal-filters'>
      <input
        style={{ background:'var(--bg3)', border:'1px solid var(--bo)', borderRadius:'var(--RR)', padding:'8px 13px', color:'var(--TX)', fontSize:13, outline:'none', width:200 }}
        placeholder='Search meals…'
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      {CATS.map(c => (
        <button key={c} className={`btn btn-sm ${filter===c?'btn-primary':'btn-ghost'}`} onClick={() => onFilter(c)}>
          {c === 'all' ? 'All' : c === 'veg' ? '🌿 Veg' : c === 'nonveg' ? '🥩 Non-Veg' : '🌱 Vegan'}
        </button>
      ))}
    </div>
  )
}