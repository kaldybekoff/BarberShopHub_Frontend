# BarberHub

A web platform for finding barbershops and booking appointments online.

Live demo: [https://barber-shop-hub-frontend.vercel.app/](https://barber-shop-hub-frontend.vercel.app/)

---

## The problem

Most barbershops still take bookings by phone. Customers call, hope someone picks up, and try to figure out a time that works. BarberHub moves that process online — find a shop, pick a service, book a slot, done.

---

## What it does

Customers can search for barbershops nearby, filter by rating and open status, see available services and prices, book an appointment for a specific master and time slot, leave reviews, and cancel or reschedule if plans change.

Barbershop owners get a dashboard with daily stats, a calendar view of bookings (day/week/month), a bookings manager (confirm / complete / cancel), a services CRUD, and an analytics page with revenue, top services and client growth.

---

## Tech stack


|           |                                                  |
| --------- | ------------------------------------------------ |
| Framework | React + Vite                                     |
| Styling   | Tailwind CSS                                     |
| Routing   | React Router                                     |
| HTTP      | Axios                                            |
| Auth      | JWT in `localStorage` + Google Identity Services |
| Language  | JavaScript                                       |
| Backend   | PHP / Laravel (separate repo, hosted on Railway) |


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

Copy `.env.example` to `.env.local` and fill in the values:

```
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
VITE_API_BASE_URL=https://your-backend-host/api/v1
```

If `VITE_API_BASE_URL` is not set, the app falls back to the deployed backend URL configured in `src/api/axiosInstance.js`.

---

## Project structure

```
src/
  pages/
    auth/         — welcome, login, register, verify, forgot/reset password
    user/         — home, search, shop details, booking, booking success,
                    my appointments, my reviews, profile
    barbershop/   — dashboard, schedule, bookings, services, analytics
  components/
    shared/       — buttons, inputs, loaders
    auth/         — auth brand panel
    home/         — greeting, search bar, filter chips, nearby shops, popular services
    shop/         — shop card, shop header, service item, review card, tabs
    booking/      — steps, service/master/date/time selectors, summary, success
    appointments/ — appointment card with cancel/reschedule, tabs
    barbershop/   — stats card, revenue chart, schedule calendar/slot, dashboard list
    layout/       — header, bottom nav, sidebar, topbar, layouts per role
  api/            — axios functions per domain
                    (authApi, shopApi, bookingApi, appointmentApi,
                     reviewApi, dashboardApi)
  context/        — AuthContext (token + user, persisted in localStorage)
  routes/         — AppRouter, ProtectedRoute, RoleRoute
  hooks/          — useAuth, useIsMobile
  constants/      — roles, colors, nav items, booking steps
  utils/          — formatDate, formatPrice, formatTime, getStatusLabel
```

---

## Team members

- Yeskendir Kaldybek - 230103282
- Medet Muratbek - 230103176
- Miras Sarkytbek - 230103130
- Artyom Novikov - 230103002

---

## License

MIT