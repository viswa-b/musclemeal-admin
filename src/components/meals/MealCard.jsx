import React from 'react'
import { fmtCurrency } from '../../utils/formatters'
import '../../styles/meals.css'

export default function MealCard({ meal, onEdit, onDelete, onToggle }) {
  const img = meal.img_url || meal.img || ''

  return (
    <div className='meal-card'>
      <div className='meal-card-img'>
        {img
          ? <img src={img} alt={meal.name} loading='lazy'/>
          : <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:38 }}>🍽️</div>
        }
        <div className='meal-overlay'>
          <div style={{ display:'flex', gap:7 }}>
            <button className='btn btn-primary btn-sm' onClick={onEdit}>✏️ Edit</button>
            <button className='btn btn-danger btn-sm'  onClick={onDelete}>🗑 Del</button>
          </div>
        </div>
        <span className={`meal-avail ${meal.is_available ? 'yes' : 'no'}`}>
          {meal.is_available ? 'Available' : 'Hidden'}
        </span>
      </div>
      <div className='meal-card-body'>
        <div className='meal-card-name'>{meal.name}</div>
        <div className='meal-card-meta'>🔥 {meal.kcal} kcal · {meal.category} · {meal.section}</div>
        <div className='meal-macros'>
          <span className='macro-tag'>P: <span style={{color:'#FF4500'}}>{meal.protein}g</span></span>
          <span className='macro-tag'>C: <span style={{color:'#9C27B0'}}>{meal.carbs}g</span></span>
          <span className='macro-tag'>F: <span style={{color:'#FFC107'}}>{meal.fats}g</span></span>
        </div>
        <div className='meal-card-foot'>
          <span className='meal-price'>{fmtCurrency(meal.price)}</span>
          <div className='meal-actions'>
            <button className={`btn btn-sm ${meal.is_available ? 'btn-danger' : 'btn-success'}`} onClick={onToggle}>
              {meal.is_available ? 'Hide' : 'Show'}
            </button>
            <button className='btn btn-ghost btn-sm' onClick={onEdit}>✏️</button>
          </div>
        </div>
      </div>
    </div>
  )
}