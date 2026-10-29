import { useState } from 'react'
import Modal from './Modal'

const MAX = 120

const TaskForm = ({ task, onSave, onClose }) => {
  const isEdit = Boolean(task)                      
  const [text, setText] = useState(task ? task.todo : '')
  const [completed, setCompleted] = useState(task ? task.completed : false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const validate = (value) => {
    const v = value.trim()                           
    if (!v) return 'Task title is required.'
    if (v.length < 3) return 'Task title must be at least 3 characters.'
    if (v.length > MAX) return `Task title must be ${MAX} characters or fewer.`
    return ''
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const message = validate(text)
    if (message) {                                  
      setError(message)
      return
    }
    setSaving(true)
    const ok = await onSave({ todo: text.trim(), completed })
    setSaving(false)
    if (ok) onClose()                               
    else setError('Something went wrong while saving. Please try again.')
  }

  return (
    <Modal title={isEdit ? 'Edit Task' : 'Add New Task'} onClose={onClose}>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
        <div>
          <input
            type='text'
            autoFocus
            placeholder='What needs to be done?'
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${error ? 'border-red-400' : 'border-slate-300 focus:border-indigo-500'}`}
            value={text}
            onChange={(e) => { setText(e.target.value); setError('') }}
          />
          <div className='mt-1 flex justify-between text-xs'>
            <span className='text-red-500'>{error}</span>
            <span className='text-slate-400'>{text.length}/{MAX}</span>
          </div>
        </div>

        <label className='flex items-center gap-2 text-sm text-slate-700'>
          <input type='checkbox' checked={completed} onChange={(e) => setCompleted(e.target.checked)} className='h-4 w-4 accent-emerald-600' />
          Mark as completed
        </label>

        <div className='flex justify-end gap-3'>
          <button type='button' onClick={onClose} className='rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100'>
            Cancel
          </button>
          <button disabled={saving} className='rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50'>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskForm
