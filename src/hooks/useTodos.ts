import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTodo, deleteTodo, getTodos, updateTodo } from '../api/todos'
import type { Todo, TodoId } from '../shared/types'

const todosQueryKey = ['todos']

export function useTodos() {
  const queryClient = useQueryClient()
  const todosQuery = useQuery({
    queryKey: todosQueryKey,
    queryFn: getTodos,
  })

  const addMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(todosQueryKey)

      queryClient.setQueryData<Todo[]>(todosQueryKey, (prevTodos = []) => [
        ...prevTodos,
        newTodo,
      ])

      return { previousTodos }
    },
    onError: (_error, _todo, context) => {
      queryClient.setQueryData(todosQueryKey, context?.previousTodos)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: todosQueryKey })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(todosQueryKey)

      queryClient.setQueryData<Todo[]>(todosQueryKey, (prevTodos = []) =>
        prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      )

      return { previousTodos }
    },
    onError: (_error, _todo, context) => {
      queryClient.setQueryData(todosQueryKey, context?.previousTodos)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: todosQueryKey })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKey })
      const previousTodos = queryClient.getQueryData<Todo[]>(todosQueryKey)

      queryClient.setQueryData<Todo[]>(todosQueryKey, (prevTodos = []) =>
        prevTodos.filter((todo) => todo.id !== id),
      )

      return { previousTodos }
    },
    onError: (_error, _id, context) => {
      queryClient.setQueryData(todosQueryKey, context?.previousTodos)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: todosQueryKey })
    },
  })

  function add(text: string) {
    addMutation.mutate({
      id: `optimistic-${Date.now()}`,
      text,
      done: false,
    })
  }

  function toggle(id: TodoId) {
    const todo = todosQuery.data?.find((item) => item.id === id)

    if (todo) {
      toggleMutation.mutate({ ...todo, done: !todo.done })
    }
  }

  function remove(id: TodoId) {
    deleteMutation.mutate(id)
  }

  return {
    ...todosQuery,
    todos: todosQuery.data ?? [],
    add,
    toggle,
    remove,
  }
}
