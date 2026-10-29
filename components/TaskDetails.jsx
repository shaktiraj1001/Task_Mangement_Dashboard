import { useEffect, useState } from 'react'
import Modal from './Modal'
import { fetchTodoById } from '../api/todosApi'

const TaskDetails = ({ task, onClose }) => {
  const [userId, setUserId] = useState(task.userId)
  const [loading, setLoading] = useState(!task.local)  
  const [error, setError] = useState('')

  useEffect(() => {
    if (task.local) return
    fetchTodoById(task.id)
      .then((data) => setUserId(data.userId))
      .catch(() => setError('Could not load extra details from the API.'))
      .finally(() => setLoading(false))
  }, [task.id])

  const rows = [
    ['ID', task.id],
    ['Task', task.todo],
    ['Status', task.completed ? 'Completed' : 'Pending'],
    ['User ID', loading ? 'Loading...' : userId ?? '-'],
  ]

  return (
    <Modal title='Task Details' onClose={onClose}>
      <dl className='divide-y divide-slate-100 text-sm'>
        {rows.map(([label, value]) => (
          <div key={label} className='flex justify-between gap-4 py-2'>
            <dt className='text-slate-500'>{label}</dt>
            <dd className='break-words text-right font-medium text-slate-800'>{value}</dd>
          </div>
        ))}
      </dl>
      {error && <p className='mt-3 text-xs text-red-500'>{error}</p>}
    </Modal>
  )
}

export default TaskDetails
