import { useState, useMemo } from 'react'
import useTodos from './hooks/useTodos'
import StatsCards from './components/StatsCards'
import Toolbar from './components/Toolbar'
import TaskList from './components/TaskList'
import Pagination from './components/Pagination'
import TaskForm from './components/TaskForm'
import ConfirmDialog from './components/ConfirmDialog'
import TaskDetails from './components/TaskDetails'

const PAGE_SIZE = 10   

const App = () => {
  const { todos, loading, error, actionError, clearActionError, reload, addTask, editTask, deleteTask } = useTodos()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')       
  const [sort, setSort] = useState('id-desc')       
  const [page, setPage] = useState(1)

  const [formState, setFormState] = useState(null)  
  const [toDelete, setToDelete] = useState(null)   
  const [viewing, setViewing] = useState(null)      
  const [confirmReset, setConfirmReset] = useState(false)

  const visibleTasks = useMemo(() => {
    const q = search.trim().toLowerCase()

    const filtered = todos.filter((t) => {
      const statusOk = filter === 'all' || (filter === 'completed' ? t.completed : !t.completed)
      const searchOk = t.todo.toLowerCase().includes(q)   
      return statusOk && searchOk
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'id-asc') return a.id - b.id
      if (sort === 'id-desc') return b.id - a.id
      if (sort === 'title-asc') return a.todo.localeCompare(b.todo)
      return b.todo.localeCompare(a.todo)
    })
  }, [todos, search, filter, sort])

  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)   
  const pageTasks = visibleTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const changeSearch = (v) => { setSearch(v); setPage(1) }
  const changeFilter = (v) => { setFilter(v); setPage(1) }
  const changeSort = (v) => { setSort(v); setPage(1) }

  const handleSave = (data) =>
    formState.task ? editTask(formState.task, data) : addTask(data)

  const handleToggle = (task) => editTask(task, { completed: !task.completed })

  const handleDelete = async () => {
    await deleteTask(toDelete)
    setToDelete(null)
  }

  const handleReset = async () => {
    await reload()
    setConfirmReset(false)
    setPage(1)
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-800'>
      <div className='mx-auto max-w-4xl px-4 py-8'>

        <header className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold sm:text-3xl'>Task Dashboard</h1>
          <button onClick={() => setConfirmReset(true)} className='text-sm text-slate-500 underline hover:text-slate-800'>
            Reset data
          </button>
        </header>

        {}
        {loading ? (
          <p className='py-20 text-center text-slate-500'>Loading tasks...</p>
        ) : error ? (
          <div className='rounded-lg border border-red-200 bg-red-50 p-6 text-center'>
            <p className='text-red-700'>{error}</p>
            <button onClick={reload} className='mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white'>Retry</button>
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            <StatsCards todos={todos} />

            {}
            {actionError && (
              <div className='flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                <span>{actionError}</span>
                <button onClick={clearActionError} aria-label='Dismiss' className='text-lg leading-none'>×</button>
              </div>
            )}

            <Toolbar
              search={search} onSearch={changeSearch}
              filter={filter} onFilter={changeFilter}
              sort={sort} onSort={changeSort}
              onAdd={() => setFormState({})}
            />

            <TaskList
              tasks={pageTasks}
              onToggle={handleToggle}
              onEdit={(task) => setFormState({ task })}
              onDelete={setToDelete}
              onDetails={setViewing}
            />

            <Pagination
              page={currentPage} totalPages={totalPages}
              totalItems={visibleTasks.length} pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {}
      {formState && (
        <TaskForm task={formState.task} onSave={handleSave} onClose={() => setFormState(null)} />
      )}

      {toDelete && (
        <ConfirmDialog
          title='Delete task?'
          message={`Are you sure you want to delete "${toDelete.todo}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      {viewing && <TaskDetails task={viewing} onClose={() => setViewing(null)} />}

      {confirmReset && (
        <ConfirmDialog
          title='Reset all data?'
          message='This throws away your local changes and downloads the original tasks from the API again.'
          confirmLabel='Reset'
          onConfirm={handleReset}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </div>
  )
}

export default App
