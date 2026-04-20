# Backend Requirements — BarberHub

Список эндпоинтов и изменений, которые нужны фронтенду.

---

## 1. Доступные слоты (КРИТИЧНО)

Без этого шаг 2 бронирования работает на хардкоде.

```
GET /api/v1/barbershops/{slug}/available-slots
  ?barber_id=1        (опционально, если не выбран — любой)
  ?date=2026-04-20    (YYYY-MM-DD)
  ?service_id=3       (для расчёта длительности)
```

Ожидаемый ответ:
```json
{
  "success": true,
  "data": [
    { "time": "09:00", "available": true },
    { "time": "09:30", "available": false },
    { "time": "10:00", "available": true }
  ]
}
```

---

## 2. Дашборд владельца (КРИТИЧНО)

`GET /api/v1/owner/dashboard` — нужна конкретная структура ответа:

```json
{
  "success": true,
  "data": {
    "barbershop": {
      "id": 1,
      "name": "BarbarossA",
      "slug": "barbarossa",
      "address": "ул. Абая 14",
      "phone": "+7 777 123 45 67",
      "rating": 4.9,
      "reviews_count": 120
    },
    "stats": {
      "bookings_today": 8,
      "weekly_revenue": 145000,
      "rating": 4.9,
      "new_clients": 3,
      "average_check": 2800
    },
    "upcoming_bookings": [
      {
        "id": 1,
        "scheduled_at": "2026-04-20T11:00:00",
        "client_name": "Алибек",
        "service": "Классическая стрижка",
        "barber_name": "Amir",
        "status": "confirmed",
        "total_price": 2500,
        "duration_minutes": 30
      }
    ]
  }
}
```

---

## 3. Аналитика владельца

```
GET /api/v1/owner/analytics?period=week|month|year
```

Ожидаемый ответ:
```json
{
  "success": true,
  "data": {
    "stats": {
      "revenue_total": 580000,
      "revenue_change_percent": 12,
      "bookings_count": 214,
      "bookings_change_percent": 8,
      "new_clients": 47,
      "new_clients_change_percent": 5,
      "average_check": 2710,
      "average_check_change_percent": 3
    },
    "revenue_by_day": [
      { "date": "2026-04-14", "amount": 18500 },
      { "date": "2026-04-15", "amount": 22000 }
    ],
    "popular_services": [
      { "name": "Классическая стрижка", "count": 87, "revenue": 130500 },
      { "name": "Фейд + укладка", "count": 63, "revenue": 157500 }
    ],
    "ratings_distribution": {
      "5": 98,
      "4": 18,
      "3": 4,
      "2": 0,
      "1": 0
    }
  }
}
```

---

## 4. Бронирования владельца

```
GET /api/v1/owner/bookings
  ?filter=pending|confirmed|cancelled|completed
  ?date_from=2026-04-01
  ?date_to=2026-04-30
  ?page=1
```

```
POST /api/v1/owner/bookings/{id}/confirm
POST /api/v1/owner/bookings/{id}/cancel
GET  /api/v1/owner/bookings/{id}
```

Ответ для `/owner/bookings/{id}`:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "client_name": "Алибек",
    "client_phone": "+7 777 111 22 33",
    "barber_name": "Amir",
    "scheduled_at": "2026-04-20T11:00:00",
    "status": "confirmed",
    "services": [
      { "id": 1, "name": "Классическая стрижка", "price": 2500, "duration_minutes": 30 }
    ],
    "total_price": 2500,
    "total_duration_minutes": 30,
    "comment": "Хочу погуще сбоку",
    "reminder_enabled": true
  }
}
```

---

## 5. Управление услугами (владелец)

```
GET    /api/v1/owner/services
POST   /api/v1/owner/services
PUT    /api/v1/owner/services/{id}
DELETE /api/v1/owner/services/{id}
```

Тело для POST/PUT:
```json
{
  "name": "Классическая стрижка",
  "category_id": 1,
  "price": 2500,
  "duration_minutes": 30,
  "description": "Ножницы + машинка"
}
```

---

## 6. Расписание владельца

```
GET /api/v1/owner/schedule
  ?from=2026-04-20
  ?to=2026-04-26
  ?barber_id=1   (опционально)
```

Ожидаемый ответ:
```json
{
  "success": true,
  "data": [
    {
      "date": "2026-04-20",
      "slots": [
        {
          "time": "10:00",
          "type": "booked",
          "booking_id": 12,
          "client_name": "Алибек",
          "service": "Стрижка",
          "barber_name": "Amir",
          "duration_minutes": 30
        },
        {
          "time": "11:00",
          "type": "free"
        }
      ]
    }
  ]
}
```

---

## 7. Профиль пользователя

Расширить `GET /api/v1/auth/me` — добавить поля:
```json
{
  "data": {
    "id": 1,
    "name": "Medet",
    "email": "medet@bbs.kz",
    "phone": "+7 777 123 45 67",
    "avatar_url": "https://...",
    "email_verified_at": "2026-04-17T13:33:24"
  }
}
```

Добавить:
```
PUT /api/v1/users/profile
Body: { name, phone, avatar_url }
```

---

## 8. Флаги действий в бронировании

В ответе `GET /api/v1/bookings` и `GET /api/v1/bookings/{id}` добавить:
```json
{
  "data": {
    "id": 1,
    "status": "confirmed",
    "scheduled_at": "2026-04-20T11:00:00",
    "can_cancel": true,
    "can_reschedule": true,
    "can_review": false
  }
}
```

`can_cancel` / `can_reschedule` = `true` если до записи больше 2 часов.
`can_review` = `true` если статус `completed` и отзыв ещё не оставлен.

---

## 9. Slug барбершопа в списке бронирований

В ответе `GET /api/v1/bookings` добавить `barbershop_slug`:
```json
{
  "id": 1,
  "barbershop_name": "BarbarossA",
  "barbershop_slug": "barbarossa",
  "barbershop_logo": "...",
  "barber_name": "Amir",
  "scheduled_at": "2026-04-20T11:00:00",
  "total_price": 2500,
  "status": "confirmed"
}
```

---

## 10. Отзывы — редактирование и удаление

```
PUT    /api/v1/barbershops/{slug}/reviews/{id}
Body:  { rating, comment }

DELETE /api/v1/barbershops/{slug}/reviews/{id}
```

---

## 11. Сброс пароля

```
POST /api/v1/auth/forgot-password
Body: { email }

POST /api/v1/auth/reset-password
Body: { token, password, password_confirmation }
```

---

## 12. Фильтры поиска (расширить существующий эндпоинт)

В `GET /api/v1/barbershops` добавить параметры:
```
?rating_min=4.5
?price_max=3000
?order_by=rating|distance|price
```

В каждый элемент ответа добавить:
```json
{
  "id": 1,
  "name": "BarbarossA",
  "slug": "barbarossa",
  "rating": 4.9,
  "price_from": 1500,
  "distance_km": 1.2,
  "status": "open"
}
```

---

## 13. Популярные услуги (главная страница)

```
GET /api/v1/services/popular?limit=8
```

Ответ:
```json
{
  "data": [
    { "id": 1, "name": "Стрижки", "icon": "scissors", "shops_count": 47 },
    { "id": 2, "name": "Борода", "icon": "beard", "shops_count": 38 }
  ]
}
```

---

## 14. Фото галерея барбершопа

```
GET /api/v1/barbershops/{slug}/photos
```

Ответ:
```json
{
  "data": [
    { "id": 1, "url": "https://...", "order": 1 }
  ]
}
```

Для владельца:
```
POST   /api/v1/owner/photos        (multipart/form-data)
DELETE /api/v1/owner/photos/{id}
```

---

## 15. Уведомления

```
GET  /api/v1/notifications?unread=true
POST /api/v1/notifications/{id}/read
POST /api/v1/notifications/read-all
```

---

## Приоритеты

| # | Фича | Приоритет |
|---|------|-----------|
| 1 | Available slots для бронирования | 🔴 Критично |
| 2 | Структура /owner/dashboard | 🔴 Критично |
| 3 | CRUD услуг владельца | 🟠 Высокий |
| 4 | /owner/bookings с фильтрами | 🟠 Высокий |
| 5 | /owner/analytics | 🟠 Высокий |
| 6 | PUT /users/profile + расширить /auth/me | 🟠 Высокий |
| 7 | can_cancel / can_review флаги в bookings | 🟡 Средний |
| 8 | barbershop_slug в списке bookings | 🟡 Средний |
| 9 | /owner/schedule | 🟡 Средний |
| 10 | Сброс пароля | 🟡 Средний |
| 11 | Редактирование/удаление отзывов | 🟡 Средний |
| 12 | Расширить фильтры поиска | 🟡 Средний |
| 13 | /services/popular | 🟢 Низкий |
| 14 | Фото галерея | 🟢 Низкий |
| 15 | Уведомления | 🟢 Низкий |
