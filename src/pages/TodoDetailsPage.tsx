import { Button, Card, Result, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import type { Todo } from '../shared/types'

type TodoDetailsPageProps = {
  todos: Todo[]
}

export function TodoDetailsPage({ todos }: TodoDetailsPageProps) {
  const navigate = useNavigate()
  const { id } = useParams()
  const todo = todos.find((item) => item.id === Number(id))

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
