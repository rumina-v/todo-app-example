import { Alert, Card, Flex, Progress, Skeleton, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { TodoForm } from '../components/TodoForm/TodoForm'
import { TodoList } from '../components/TodoList/TodoList'
import { useTodos } from '../hooks/useTodos'

export function TodoPage() {
  const navigate = useNavigate()
  const { todos, isPending, isError, error, add, toggle, remove } = useTodos()
  const completedCount = todos.filter((todo) => todo.done).length
  const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100)

  if (isPending) {
    return <Skeleton active />
  }

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        message="Не удалось загрузить задачи"
        description={`${error.message}. Проверьте, запущен ли mock API.`}
      />
    )
  }

  return (
    <Card className="todo-card">
      <Flex vertical gap="middle">
        <div>
          <Typography.Title level={2}>Список задач</Typography.Title>
          <Typography.Text type="secondary">
            Выполнено: {completedCount} из {todos.length}
          </Typography.Text>
        </div>
        <Progress percent={progress} />
        <TodoForm onAdd={add} />
        <TodoList
          todos={todos}
          onToggle={toggle}
          onDelete={remove}
          onOpen={(id) => navigate(`/todos/${id}`)}
        />
      </Flex>
    </Card>
  )
}
