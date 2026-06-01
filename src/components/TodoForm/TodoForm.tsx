import { Button, Flex, Input } from 'antd'
import { useState, type FormEvent } from 'react'

type TodoFormProps = {
  onAdd: (text: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedText = inputValue.trim()

    if (!trimmedText) {
      return
    }

    onAdd(trimmedText)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="small">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Что нужно сделать?"
          aria-label="Новая задача"
        />
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Flex>
    </form>
  )
}
