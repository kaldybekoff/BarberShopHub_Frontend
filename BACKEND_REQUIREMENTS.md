# BarberHub — Backend Requirements

> Документ описывает что необходимо реализовать на бэкенде для полноценной работы фронтенда.  
> Составлен на основе анализа текущего кода фронта и Swagger (`/api/documentation`).

---

## Текущие 20 эндпоинтов (уже есть)

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/auth/register` | Регистрация |
| POST | `/auth/verify-email` | Подтверждение email (OTP) |
| POST | `/auth/resend-code` | Повторная отправка OTP |
| POST | `/auth/login` | Вход по email/паролю |
| POST | `/auth/google` | Вход через Google |
| POST | `/auth/logout` | Выход |
| GET | `/auth/me` | Текущий пользователь |
| POST | `/auth/forgot-password` | Запрос сброса пароля |
| POST | `/auth/reset-password` | Сброс пароля |
| GET | `/barbershops` | Список барбершопов |
| GET | `/barbershops/{slug}` | Детали барбершопа |
| GET | `/barbershops/{slug}/available-slots` | Свободные слоты |
| POST | `/barbershops/{slug}/reviews` | Оставить отзыв |
| GET | `/bookings` | Мои записи (клиент) |
| POST | `/bookings` | Создать запись |
| GET | `/bookings/{id}` | Детали записи |
| POST | `/bookings/{id}/cancel` | Отменить запись |
| POST | `/bookings/{id}/reschedule` | Перенести запись |
| GET | `/owner/dashboard` | Дашборд владельца |
| GET | `/owner/calendar` | Календарь владельца |

---

## Что нужно добавить

### 1. Owner — Управление записями

**Проблема:** Сейчас фронт для страницы «Записи» использует `nearest_bookings` из дашборда (только ближайшие ~5 записей). Полный список с фильтрацией недоступен.

---

#### `GET /owner/bookings`

Полный список всех записей барбершопа с фильтрацией и пагинацией.

**Query params:**
```
filter     string   — all | pending | confirmed | cancelled | completed
per_page   int      — default: 15
page       int      — default: 1
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "client_name": "Иван Петров",
        "barber_name": "Alikhan",
        "service_name": "Классическая стрижка",
        "services_count": 1,
        "scheduled_at": "2026-04-23T14:00:00Z",
        "total_price": 1500,
        "status": "pending"
      }
    ],
    "current_page": 1,
    "last_page": 3,
    "per_page": 15,
    "total": 42
  }
}
```

> **Логика:** Возвращает записи только того барбершопа, которым управляет авторизованный owner. Если owner пытается получить записи чужого барбершопа — `403`.

---

#### `POST /owner/bookings/{id}/cancel`

Отмена записи клиента со стороны владельца.

**Path param:** `id` — ID записи  
**Request body:** пустой (или опциональный `reason: string`)

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "cancelled"
  }
}
```

> **Логика:** Запись должна принадлежать барбершопу этого owner. Отменить можно только `pending` или `confirmed`. При отмене — отправить email клиенту (если notifications реализованы).

---

#### `POST /owner/bookings/{id}/complete`

Пометить запись как выполненную (клиент обслужен).

**Path param:** `id` — ID записи

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "completed"
  }
}
```

> **Логика:** Можно завершить только `confirmed` запись. После завершения клиент получает возможность оставить отзыв.

---

### 2. Owner — Управление услугами

**Проблема:** Сейчас фронт загружает услуги через 3 запроса: `/owner/dashboard` → `/barbershops?search=` → `/barbershops/{slug}`. Это медленно и ненадёжно. Прямого CRUD нет.

---

#### `GET /owner/services`

Список услуг своего барбершопа.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Классическая стрижка",
      "category_id": 1,
      "category_name": "Стрижка",
      "price": 1500,
      "duration_minutes": 30
    }
  ]
}
```

---

#### `POST /owner/services`

Создать новую услугу.

**Request body:**
```json
{
  "name": "Классическая стрижка",
  "category_name": "Стрижка",
  "price": 1500,
  "duration_minutes": 30
}
```

**Validation:**
- `name` — required, string, max 100
- `price` — required, int, min 0
- `duration_minutes` — required, int, min 5

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "name": "Классическая стрижка",
    "category_name": "Стрижка",
    "price": 1500,
    "duration_minutes": 30
  }
}
```

---

#### `PUT /owner/services/{id}`

Обновить существующую услугу.

**Path param:** `id` — ID услуги

**Request body** (те же поля что и POST, все опциональные):
```json
{
  "name": "Стрижка + укладка",
  "price": 2000,
  "duration_minutes": 45
}
```

**Response `200`:** аналогично POST response.

> **Логика:** Услуга должна принадлежать барбершопу этого owner — иначе `403`.

---

#### `DELETE /owner/services/{id}`

Удалить услугу.

**Path param:** `id` — ID услуги

**Response `200`:**
```json
{
  "success": true,
  "message": "Услуга удалена"
}
```

> **Логика:** Нельзя удалить услугу если есть активные (`pending`/`confirmed`) записи на неё. Вернуть `422` с объяснением.

---

### 3. Owner — Аналитика

**Проблема:** Сейчас фронт использует данные из `/owner/dashboard` для страницы аналитики. Это только текущая неделя и без детализации по услугам. Переключение периодов (Неделя / Месяц / Год) не работает.

---

#### `GET /owner/analytics`

**Query params:**
```
period   string   — week | month | year  (default: week)
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "revenue_total": 125000,
      "revenue_change_percent": 12.5,
      "bookings_count": 47,
      "bookings_change_percent": 8.3,
      "new_clients": 12,
      "new_clients_change_percent": -5.0,
      "average_check": 2659,
      "average_check_change_percent": 3.8
    },
    "revenue_by_day": [
      { "date": "2026-04-17", "amount": 15000 },
      { "date": "2026-04-18", "amount": 22000 },
      { "date": "2026-04-19", "amount": 18500 },
      { "date": "2026-04-20", "amount": 9000 },
      { "date": "2026-04-21", "amount": 27000 },
      { "date": "2026-04-22", "amount": 19500 },
      { "date": "2026-04-23", "amount": 14000 }
    ],
    "popular_services": [
      {
        "name": "Классическая стрижка",
        "revenue": 45000,
        "count": 30
      },
      {
        "name": "Стрижка + борода",
        "revenue": 38000,
        "count": 19
      }
    ]
  }
}
```

> **Логика:**
> - `period=week` → данные за последние 7 дней, `_change_percent` = сравнение с предыдущими 7 днями
> - `period=month` → данные за текущий месяц, сравнение с прошлым месяцем. `revenue_by_day` — все дни месяца
> - `period=year` → данные за текущий год, сравнение с прошлым годом. `revenue_by_day` — 12 точек (по месяцу)

---

### 4. `GET /auth/me` — добавить `barbershop_slug` в ответ

**Проблема:** Фронт определяет роль owner через запрос к `/owner/dashboard`. Для страницы «Услуги» нужен slug барбершопа, но его нет ни в `/auth/me` ни в `/owner/dashboard`. Фронт делает поиск через `/barbershops?search=name` что ненадёжно.

**Текущий ответ `/auth/me`:**
```json
{
  "id": 5,
  "name": "Owner 1",
  "email": "owner@example.com"
}
```

**Нужный ответ для owner:**
```json
{
  "id": 5,
  "name": "Owner 1",
  "email": "owner@example.com",
  "barbershop_id": 3,
  "barbershop_slug": "barbershop-kz"
}
```

> Поля `barbershop_id` и `barbershop_slug` присутствуют только если пользователь является owner. Для обычных User — `null` или отсутствуют.

---

### 5. `GET /owner/dashboard` — добавить `barbershop_slug`

Аналогично п.4 — добавить `slug` в объект `barbershop`:

**Текущий ответ:**
```json
{
  "barbershop": {
    "id": 3,
    "name": "BarberHub KZ",
    "rating": 4.9
  }
}
```

**Нужный ответ:**
```json
{
  "barbershop": {
    "id": 3,
    "name": "BarberHub KZ",
    "slug": "barberhub-kz",
    "rating": 4.9
  }
}
```

---

### 6. `PUT /auth/me` — Редактирование профиля пользователя

Сейчас страница «Профиль» показывает данные только в режиме просмотра — нет возможности ничего изменить.

**Request body** (все поля опциональные):
```json
{
  "name": "Новое имя",
  "phone": "+77001234567"
}
```

**Validation:**
- `name` — string, max 100
- `phone` — string, формат телефона

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Новое имя",
    "email": "user@example.com",
    "phone": "+77001234567"
  }
}
```

---

### 7. `GET /owner/calendar` — уточнение формата ответа

Фронт использует этот эндпоинт для трёх режимов: День, Неделя (6 дней), Месяц (до 31 дня). Текущий формат ответа не задокументирован в Swagger.

**Ожидаемый формат:**
```json
{
  "success": true,
  "data": {
    "days": [
      {
        "date": "2026-04-23",
        "bookings": [
          {
            "id": 1,
            "client_name": "Иван Петров",
            "barber_name": "Alikhan",
            "scheduled_at": "2026-04-23T14:00:00Z",
            "total_price": 1500,
            "status": "confirmed"
          }
        ]
      },
      {
        "date": "2026-04-24",
        "bookings": []
      }
    ]
  }
}
```

> **Важно:** Если день запрашивается но записей нет — всё равно включить его в массив `days` с пустым `bookings: []`. Фронт рендерит "Нет слотов" только если дата есть в ответе.

---

### 8. Поле `reminder_enabled` при создании записи

Фронт отправляет `reminder_enabled: true/false` при бронировании, но в текущем Swagger оно не описано в required полях и не задокументировано что происходит дальше.

**Нужно:**
- Принимать `reminder_enabled` в `POST /bookings`
- Если `true` — за 2 часа до записи отправлять email-напоминание клиенту

**Текущий payload `POST /bookings`:**
```json
{
  "barbershop_id": 3,
  "barber_id": 2,
  "service_ids": [1],
  "scheduled_at": "2026-04-23 14:00",
  "comment": "Прийду немного позже",
  "reminder_enabled": true
}
```

---

## Сводная таблица приоритетов

| # | Эндпоинт | Приоритет | Влияние |
|---|----------|-----------|---------|
| 1 | `GET /owner/bookings` | 🔴 Критично | Страница «Записи» работает на временных данных |
| 2 | `POST /owner/bookings/{id}/cancel` | 🔴 Критично | Кнопка «Отменить» на странице «Записи» |
| 3 | `POST /owner/bookings/{id}/complete` | 🔴 Критично | Кнопка «Выполнено» на странице «Записи» |
| 4 | `GET /owner/services` | 🔴 Критично | Сейчас 3 запроса вместо 1, ненадёжно |
| 5 | `POST /owner/services` | 🔴 Критично | Кнопка «Добавить услугу» не работает |
| 6 | `PUT /owner/services/{id}` | 🟡 Важно | Кнопка «Редактировать» не работает |
| 7 | `DELETE /owner/services/{id}` | 🟡 Важно | Кнопка «Удалить» не работает |
| 8 | `GET /owner/analytics` | 🟡 Важно | Аналитика показывает только данные недели |
| 9 | `barbershop_slug` в `/auth/me` и `/owner/dashboard` | 🟡 Важно | Услуги загружаются через ненадёжный поиск |
| 10 | `PUT /auth/me` | 🟢 Желательно | Нет редактирования профиля |
| 11 | `reminder_enabled` логика | 🟢 Желательно | Поле принимается, но email не отправляется |

---

## Примечания

- Все owner-эндпоинты должны возвращать `403` если авторизованный пользователь не является owner.
- Статусы записей на фронте: `pending` → `confirmed` → `completed` / `cancelled`. Переход `pending → confirmed` происходит **автоматически** при создании записи (email уходит клиенту). Owner может только `cancel` или `complete`.
- Формат дат — ISO 8601 (`2026-04-23T14:00:00Z`). Фронт рендерит время с учётом локального timezone браузера через `new Date()`.
