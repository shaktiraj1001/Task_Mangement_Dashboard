import { useState, useEffect } from 'react'
import { fetchTodos, createTodo, updateTodo, removeTodo } from '../api/todosApi'

const STORAGE_KEY = 'task-dashboard-todos'   

const useTodos = () => {
  const [todos, setTodos] = useState([])         
  const [loading, setLoading] = useState(true)  
  const [error, setError] = useState('')         
  const [actionError, setActionError] = useState('') 

  const loadTodos = async (force = false) => {
    setLoading(true)
    setError('')

    if (!force) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          setTodos(JSON.parse(saved))         
          setLoading(false)
          return
        } catch (e) {
          // Ignore invalid cached data and fetch fresh todos.
        }
      }
    }

    try {
      const data = await fetchTodos()
      setTodos(data)
    } catch (err) {
      setError('Could not load tasks. Check your internet connection and try again.')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)) 
    }
  }, [todos, loading, error])

  const run = async (action, failMessage) => {
    setActionError('')
    try {
      await action()
      return true
    } catch (err) {
      setActionError(failMessage)
      return false
    }
  }

  const addTask = ({ todo, completed }) =>
    run(async () => {
      const created = await createTodo(todo, completed)
      setTodos((prev) => {
        const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1
        return [{ ...created, id: nextId, local: true }, ...prev]
      })
    }, 'Could not create the task. Please try again.')

  const editTask = (task, changes) =>
    run(async () => {
      if (!task.local) await updateTodo(task.id, changes)
      setTodos((prev) => prev.map((t) => (t.id === task.id ? { ...t, ...changes } : t)))
    }, 'Could not update the task. Please try again.')

  const deleteTask = (task) =>
    run(async () => {
      if (!task.local) await removeTodo(task.id)
      setTodos((prev) => prev.filter((t) => t.id !== task.id))
    }, 'Could not delete the task. Please try again.')

  return {
    todos, loading, error, actionError,
    clearActionError: () => setActionError(''),
    reload: () => loadTodos(true),
    addTask, editTask, deleteTask,
  }
}

export default useTodos
