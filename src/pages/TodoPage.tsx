import { Card, Flex, Progress, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { TodoForm } from '../components/TodoForm/TodoForm'
import { TodoList } from '../components/TodoList/TodoList'
import type { Todo } from '../shared/types'

type TodoPageProps = {
  todos: Todo[]
  onAdd: (text: string) => void
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoPage({ todos, onAdd, onToggle, onDelete }: TodoPageProps) {
  const navigate = useNavigate()
  const completedCount = todos.filter((todo) => todo.done).length
  const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100)

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
        <TodoForm onAdd={onAdd} />
        <TodoList
          todos={todos}
          onToggle={onToggle}
          onDelete={onDelete}
          onOpen={(id) => navigate(`/todos/${id}`)}
        />
      </Flex>
    </Card>
  )
}
