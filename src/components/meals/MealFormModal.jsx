import React, { useState } from 'react'

const DEFAULT = {
  name:'', description:'', price:'', kcal:'',
  protein:'', carbs:'', fats:'',
  category:'nonveg', section:'meals', img:'', is_available:true,
}

export default function MealFormModal({ meal, onClose, onSave }) {
  const isEdit = !!meal?.id
  const [form, setForm]     = useState(meal ? { ...DEFAULT, ...meal, img: meal.img_url||meal.img||'' } : DEFAULT)
  const [saving, setSaving] = useState(false)
  const set = (k,v) => setForm(p => ({...p, [k]:v}))

  async function handleSave() {
    if (!form.name || !form.price) return
    setSaving(true)
    await onSave({ ...form, id: meal?.id })
    setSaving(false)
    onClose()
  }

  return (
    <div className='modal-overlay' onClick={e => e.target===e.currentTarget && onClose()}>
      <div className='modal-box'>
        <div className='modal-header'>
          <div className='modal-title'>{isEdit ? 'Edit Meal' : 'Add New Meal'}</div>
          <button className='modal-close' onClick={onClose}>✕</button>
        </div>
        <div className='modal-body'>
          <div className='form-grid'>
            <div className='field-group full'><label className='field-label'>Meal Name *</label><input className='field-input' placeholder='e.g. Grilled Chicken Bowl' value={form.name} onChange={e=>set('name',e.target.value)}/></div>
            <div className='field-group full'><label className='field-label'>Description</label><textarea className='field-input field-textarea' value={form.description} onChange={e=>set('description',e.target.value)} placeholder='Brief description…'/></div>
            <div className='field-group'><label className='field-label'>Price (₹) *</label><input className='field-input' type='number' value={form.price} onChange={e=>set('price',e.target.value)}/></div>
            <div className='field-group'><label className='field-label'>Calories</label><input className='field-input' type='number' value={form.kcal} onChange={e=>set('kcal',e.target.value)}/></div>
            <div className='field-group'><label className='field-label'>Protein (g)</label><input className='field-input' type='number' value={form.protein} onChange={e=>set('protein',e.target.value)}/></div>
            <div className='field-group'><label className='field-label'>Carbs (g)</label><input className='field-input' type='number' value={form.carbs} onChange={e=>set('carbs',e.target.value)}/></div>
            <div className='field-group'><label className='field-label'>Fats (g)</label><input className='field-input' type='number' value={form.fats} onChange={e=>set('fats',e.target.value)}/></div>
            <div className='field-group'>
              <label className='field-label'>Category</label>
              <select className='field-input field-select' value={form.category} onChange={e=>set('category',e.target.value)}>
                <option value='nonveg'>🥩 Non-Veg</option>
                <option value='veg'>🌿 Veg</option>
                <option value='vegan'>🌱 Vegan</option>
              </select>
            </div>
            <div className='field-group'>
              <label className='field-label'>Section</label>
              <select className='field-input field-select' value={form.section} onChange={e=>set('section',e.target.value)}>
                <option value='meals'>Meals</option>
                <option value='snacks'>Snacks</option>
                <option value='breakfast'>Breakfast</option>
                <option value='drinks'>Drinks</option>
              </select>
            </div>
            <div className='field-group'>
              <label className='field-label'>Availability</label>
              <select className='field-input field-select' value={String(form.is_available)} onChange={e=>set('is_available',e.target.value==='true')}>
                <option value='true'>✅ Available</option>
                <option value='false'>❌ Hidden</option>
              </select>
            </div>
            <div className='field-group full'><label className='field-label'>Image URL</label><input className='field-input' placeholder='https://images.unsplash.com/…' value={form.img} onChange={e=>set('img',e.target.value)}/></div>
            {form.img && <div className='field-group full'><img src={form.img} alt='' style={{width:'100%',height:130,objectFit:'cover',borderRadius:'var(--RR)',border:'1px solid var(--bo)'}} onError={e=>e.target.style.display='none'}/></div>}
          </div>
        </div>
        <div className='modal-footer'>
          <button className='btn btn-ghost' onClick={onClose}>Cancel</button>
          <button className='btn btn-primary' onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Meal'}</button>
        </div>
      </div>
    </div>
  )
}