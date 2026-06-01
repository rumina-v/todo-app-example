import axios from 'axios'
import type { Todo, TodoId } from '../shared/types'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

export async function getTodos() {
  const response = await api.get<Todo[]>('/todos')
  return response.data
}

export async function addTodo(todo: Todo) {
  const response = await api.post<Todo>('/todos', {
    text: todo.text,
    done: todo.done,
  })
  return response.data
}

export async function updateTodo(todo: Todo) {
  const response = await api.patch<Todo>(`/todos/${todo.id}`, {
    done: todo.done,
  })
  return response.data
}

export async function deleteTodo(id: TodoId) {
  await api.delete(`/todos/${id}`)
}
