import { Button, Checkbox, Flex, Typography } from 'antd'
import type { Todo } from '../../shared/types'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onOpen: (id: number) => void
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
