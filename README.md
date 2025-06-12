### Preview
https://calculator-znhh.vercel.app/

Getting Started

First, run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:5173 with your browser to see the result.


#### Архитектура

```bash
src/
├── assets/       # Иконки
├── components/   # Переиспользуемые UI-компоненты
├── hooks/        # Кастомные React-хуки
├── providers/    # Провайдеры контекста (темы)
├── styles/       # Глобальные стили, переменные CSS, reset-файлы
├── utils/        # Утилиты и вспомогательные функции
├── App.tsx       # Главный компонент приложения
├── main.tsx      # Точка входа
```

#### Обработка пользовательского ввода

[`getCorrectedExpression`](https://github.com/maximyunak/calculator/blob/main/src/utils/get-corrected-expression.ts).
Эта функция: 
- Исключает подряд идущие операторы, запрещает вводе нескольких точек в 1 числе, ограничивает ввод значений превышающих Number.MAX_SAFE_INTEGER, предотвращая ошибки в вычислениях

#### Вычисление значений

[`calculate`](https://github.com/maximyunak/calculator/blob/main/src/utils/calculate.ts).
- Обход приоритета операций через цикл, функция последовательно проверяет операторы и применяет к текущему результату.

