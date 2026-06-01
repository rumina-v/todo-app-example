import { Layout, Menu, Typography } from 'antd'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { NotFoundPage } from './pages/NotFoundPage'
import { TodoDetailsPage } from './pages/TodoDetailsPage'
import { TodoPage } from './pages/TodoPage'

function App() {
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
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/todos/:id" element={<TodoDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
