# BarberHub — Frontend

Веб-платформа для поиска барбершопов и онлайн-записи на услуги.

**Deploy:** https://barber-shop-hub-frontend.vercel.app/

## Стек

- React + Vite
- Tailwind CSS
- React Router
- JavaScript

## Запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:5173`

## Структура

```
src/
  pages/        — страницы по ролям (auth, user, barbershop, admin)
  components/   — переиспользуемые компоненты
  routes/       — AppRouter, ProtectedRoute, RoleRoute
  context/      — AuthContext
  hooks/        — useAuth
  api/          — axios-запросы к backend
  data/         — mock данные для разработки
  styles/       — colors.js
  constants/    — roles.js
```

## Роли

- `User` — поиск барбершопов, бронирование, просмотр записей
- `Barbershop` — управление профилем, услугами, расписанием
- `Admin` — управление платформой и пользователями

## Backend

FastAPI + PostgreSQL. Разрабатывается отдельно.
