import { Layout, Menu, Typography } from 'antd'
import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { NotFoundPage } from './pages/NotFoundPage'
import { TodoDetailsPage } from './pages/TodoDetailsPage'
import { TodoPage } from './pages/TodoPage'
import type { Todo } from './shared/types'

const initialTodos: Todo[] = [
  { id: 1, text: 'Разобраться с компонентами и props', done: true },
  { id: 2, text: 'Использовать функциональное обновление state', done: false },
  { id: 3, text: 'Проверить production-сборку', done: false },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  function handleAddTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    }

    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  function handleToggleTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  function handleDeleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">
        <Typography.Title className="app-title" level={3}>
          React TODO
        </Typography.Title>
        <Menu
          className="app-menu"
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: 'todos',
              label: <Link to="/todos">Задачи</Link>,
            },
          ]}
        />
      </Layout.Header>
      <Layout.Content className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route
            path="/todos"
            element={
              <TodoPage
                todos={todos}
                onAdd={handleAddTodo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            }
          />
          <Route path="/todos/:id" element={<TodoDetailsPage todos={todos} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
