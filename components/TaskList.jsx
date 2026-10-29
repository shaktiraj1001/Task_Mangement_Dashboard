import TaskItem from './TaskItem'

const TaskList = ({ tasks, ...handlers }) => {
  if (tasks.length === 0) {
    return (
      <div className='rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500'>
        No tasks found. Try changing the search or filter, or add a new task.
      </div>
    )
  }

  return (
    <ul className='flex flex-col gap-3'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} {...handlers} />
      ))}
    </ul>
  )
}

export default TaskList
