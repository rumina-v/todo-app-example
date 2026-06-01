import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Form, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type TodoFormProps = {
  onAdd: (text: string) => void
}

const todoSchema = z.object({
  text: z.string().trim().min(1, 'Введите текст задачи'),
})

type TodoFormValues = z.infer<typeof todoSchema>

export function TodoForm({ onAdd }: TodoFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: '',
    },
  })

  function onSubmit(values: TodoFormValues) {
    onAdd(values.text)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex align="start" gap="small">
        <Form.Item
          className="todo-form-item"
          validateStatus={errors.text ? 'error' : ''}
          help={errors.text?.message}
        >
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Что нужно сделать?"
                aria-label="Новая задача"
              />
            )}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Flex>
    </form>
  )
}
