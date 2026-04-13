# BarberHub

A web platform for finding barbershops and booking appointments online.

Live demo: https://barber-shop-hub-frontend.vercel.app/

---

## The problem

Most barbershops still take bookings by phone. Customers call, hope someone picks up, and try to figure out a time that works. BarberHub moves that process online — find a shop, pick a service, book a slot, done.

---

## What it does

Customers can search for barbershops nearby, see available services and prices, book an appointment, and cancel if plans change.

Barbershop owners get a dashboard to manage their shop profile, list services with prices and duration, and see incoming bookings.

Admins have access to platform-level controls for managing users and shop listings.

---

## Tech stack

| | |
|--|--|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| HTTP | Axios |
| Language | JavaScript |
| Backend | PHP (separate repo) |

---

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/your-username/BarberHUB.git
cd BarberHUB
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## Project structure

```
src/
  pages/
    auth/         — login, register
    user/         — home, search, shop details, booking, appointments, profile
    barbershop/   — dashboard, services, schedule, appointments
    admin/        — dashboard, users, shops
  components/
    shared/       — navbar, cards, layout pieces used across roles
    auth/         — login/register form components
    user/         — user-specific components
    barbershop/   — barbershop-specific components
  api/            — axios functions per domain (authApi, bookingApi, etc.)
  context/        — AuthContext
  routes/         — AppRouter, ProtectedRoute, RoleRoute
  hooks/          — useAuth
  data/           — mock data used during development
  constants/      — roles, enums
```

---

## Backend

Developed separately. The frontend uses mock data while the API integration is in progress.

---

## License

MIT
