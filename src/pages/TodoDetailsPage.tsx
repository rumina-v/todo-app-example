import { Alert, Button, Card, Result, Skeleton, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos'

export function TodoDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { todos, isPending, isError, error } = useTodos()
  const todo = todos.find((item) => String(item.id) === id)

  if (isPending) {
    return <Skeleton active />
  }

  if (isError) {
    return <Alert type="error" showIcon message="Не удалось загрузить задачу" description={error.message} />
  }

  if (!todo) {
    return (
      <Result
        status="404"
        title="Задача не найдена"
        extra={<Button onClick={() => navigate('/todos')}>К списку задач</Button>}
      />
    )
  }

  return (
    <Card className="todo-card">
      <Typography.Title level={2}>Задача #{todo.id}</Typography.Title>
      <Typography.Paragraph>{todo.text}</Typography.Paragraph>
      <Tag color={todo.done ? 'green' : 'blue'}>
        {todo.done ? 'Выполнена' : 'В работе'}
      </Tag>
      <div className="details-actions">
        <Button type="primary" onClick={() => navigate('/todos')}>
          Назад к списку
        </Button>
      </div>
    </Card>
  )
}
