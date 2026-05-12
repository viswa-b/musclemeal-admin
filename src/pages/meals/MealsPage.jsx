import React, { useState } from 'react'
import { useMeals } from '../../hooks/useMeals'
import { mealService } from '../../services/mealService'
import MealCard       from '../../components/meals/MealCard'
import MealFormModal  from '../../components/meals/MealFormModal'
import MealFilters    from '../../components/meals/MealFilters'
import Toast  from '../../components/common/Toast'
import Loader from '../../components/common/Loader'
import '../../styles/meals.css'

export default function MealsPage() {
  const { meals, loading, addMeal, editMeal, removeMeal } = useMeals()
  const [modal, setModal]   = useState(false)
  const [editItem, setEdit] = useState(null)
  const [delId, setDelId]   = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [toast, setToast]   = useState({ msg:'', type:'' })

  function showToast(msg, type='') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg:'', type:'' }), 3200)
  }

  async function handleSave(form) {
    const payload = {
      name: form.name, description: form.description,
      price: parseFloat(form.price), kcal: parseInt(form.kcal)||0,
      protein: parseInt(form.protein)||0, carbs: parseInt(form.carbs)||0,
      fats: parseInt(form.fats)||0, category: form.category,
      section: form.section, img_url: form.img, is_available: form.is_available,
    }
    try {
      if (form.id) {
        await mealService.update(form.id, payload)
        editMeal(form.id, payload)
        showToast('Meal updated!')
      } else {
        const created = await mealService.create(payload)
        addMeal(created || { ...payload, id: Date.now() })
        showToast('Meal added!')
      }
    } catch(e) {
      showToast('Saved (demo mode)', 'warn')
      if (form.id) editMeal(form.id, payload)
      else         addMeal({ ...payload, id: Date.now() })
    }
  }

  async function handleDelete(id) {
    try { await mealService.remove(id) } catch {}
    removeMeal(id)
    setDelId(null)
    showToast('Meal deleted!', 'error')
  }

  async function handleToggle(meal) {
    const nv = !meal.is_available
    try { await mealService.toggleAvailability(meal.id, nv) } catch {}
    editMeal(meal.id, { is_available: nv })
    showToast(nv ? `${meal.name} is now available!` : `${meal.name} hidden from menu`, 'warn')
  }

  const filtered = meals.filter(m => {
    const cf = filter === 'all' || m.category === filter
    const sf = !search || m.name.toLowerCase().includes(search.toLowerCase())
    return cf && sf
  })

  if (loading) return <Loader/>

  return (
    <div className='page'>
      <Toast message={toast.msg} type={toast.type}/>
      <div className='page-header'>
        <div className='page-title'>Meal Management</div>
        <button className='btn btn-primary' onClick={() => { setEdit(null); setModal(true); }}>+ Add Meal</button>
      </div>

      <MealFilters filter={filter} onFilter={setFilter} search={search} onSearch={setSearch}/>

      <div className='meals-grid'>
        {filtered.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            onEdit={()   => { setEdit(meal); setModal(true); }}
            onDelete={()  => setDelId(meal.id)}
            onToggle={()  => handleToggle(meal)}
          />
        ))}
        {/* Add card */}
        <div className='meal-add-card' onClick={() => { setEdit(null); setModal(true); }}>
          <div className='meal-add-icon'>+</div>
          <div style={{ fontWeight:700 }}>Add New Meal</div>
        </div>
      </div>

      {/* Confirm delete */}
      {delId && (
        <div className='modal-overlay' onClick={() => setDelId(null)}>
          <div className='modal-box' style={{maxWidth:360}} onClick={e=>e.stopPropagation()}>
            <div className='modal-header'><div className='modal-title'>Delete Meal?</div><button className='modal-close' onClick={()=>setDelId(null)}>✕</button></div>
            <div className='modal-body'><p style={{color:'var(--MU)',fontSize:14,lineHeight:1.6}}>This will permanently delete the meal from your menu.</p></div>
            <div className='modal-footer'><button className='btn btn-ghost' onClick={()=>setDelId(null)}>Cancel</button><button className='btn btn-danger' onClick={()=>handleDelete(delId)}>Delete</button></div>
          </div>
        </div>
      )}

      {modal && <MealFormModal meal={editItem} onClose={()=>setModal(false)} onSave={handleSave}/>}
    </div>
  )
}