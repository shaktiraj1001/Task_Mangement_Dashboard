import axios from 'axios'

const api = axios.create({ baseURL: 'https://dummyjson.com' })
export const fetchTodos = async () => {
  const res = await api.get('/todos', { params: { limit: 0 } })
  return res.data.todos
}

export const fetchTodoById = async (id) => {
  const res = await api.get(`/todos/${id}`)
  return res.data
}

export const createTodo = async (todo, completed = false, userId = 1) => {
  const res = await api.post('/todos/add', { todo, completed, userId })
  return res.data
}

export const updateTodo = async (id, changes) => {
  const res = await api.put(`/todos/${id}`, changes)
  return res.data
}

export const removeTodo = async (id) => {
  const res = await api.delete(`/todos/${id}`)
  return res.data
}
