const TaskItem = ({ task, onToggle, onEdit, onDelete, onDetails }) => {
  return (
    <li className='flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4'>
      {}
      <input
        type='checkbox'
        checked={task.completed}
        onChange={() => onToggle(task)}
        className='mt-1 h-4 w-4 cursor-pointer accent-emerald-600'
      />

      <div className='min-w-0 flex-1'>
        {}
        <p className={`break-words font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
          {task.todo}
        </p>
        <div className='mt-1 flex flex-wrap items-center gap-2 text-xs'>
          <span className='text-slate-400'>#{task.id}</span>
          <span className={`rounded-full px-2 py-0.5 font-medium ${task.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
          {task.local && <span className='rounded-full bg-indigo-100 px-2 py-0.5 font-medium text-indigo-700'>New</span>}
        </div>
      </div>

      <div className='flex shrink-0 flex-wrap justify-end gap-3 text-sm'>
        <button onClick={() => onDetails(task)} className='text-slate-500 hover:text-slate-800'>Details</button>
        <button onClick={() => onEdit(task)} className='text-indigo-600 hover:text-indigo-800'>Edit</button>
        <button onClick={() => onDelete(task)} className='text-red-500 hover:text-red-700'>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem
