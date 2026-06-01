import { Button, Checkbox, Flex, Typography } from 'antd'
import type { Todo, TodoId } from '../../shared/types'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: TodoId) => void
  onDelete: (id: TodoId) => void
  onOpen: (id: TodoId) => void
}

export function TodoItem({ todo, onToggle, onDelete, onOpen }: TodoItemProps) {
  return (
    <Flex className="todo-item" align="center" gap="small">
      <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />
      <Typography.Text className="todo-text" delete={todo.done}>
        {todo.text}
      </Typography.Text>
      <Button type="link" onClick={() => onOpen(todo.id)}>
        Подробнее
      </Button>
      <Button danger type="text" onClick={() => onDelete(todo.id)}>
        Удалить
      </Button>
    </Flex>
  )
}
