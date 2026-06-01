# React TODO

Учебный проект на React, TypeScript и Vite.

## Возможности

- загрузка задач из mock API через `axios`;
- серверное состояние и кеш через TanStack Query;
- оптимистичное добавление, переключение и удаление задач;
- откат оптимистичного обновления при ошибке API;
- состояния интерфейса `Loading`, `Error`, `Empty`, `Success`;
- форма на `react-hook-form` с валидацией через `zod`;
- UI-компоненты из `antd`;
- маршруты `/todos`, `/todos/:id` и страница 404.

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить mock API в первом терминале:

```bash
npm run server
```

Запустить приложение во втором терминале:

```bash
npm run dev
```

Приложение доступно по адресу `http://127.0.0.1:5173/`, API - по адресу
`http://localhost:3001/todos`.

## Проверка

```bash
npm run lint
npm run build
```
