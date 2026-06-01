import { Empty, List } from 'antd'
import type { Todo } from '../../shared/types'
import { TodoItem } from '../TodoItem/TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onOpen: (id: number) => void
}

export function TodoList({ todos, onToggle, onDelete, onOpen }: TodoListProps) {
  if (todos.length === 0) {
    return <Empty description="Список задач пуст" />
  }

  return (
    <List
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onOpen={onOpen}
          />
        </List.Item>
      )}
    />
  )
}
