import axiosInstance from "./axiosInstance";
import { getShops, getShopBySlug } from "./shopApi";

export async function getDashboardStats() {
  const res = await axiosInstance.get("/owner/dashboard");
  return res.data.data;
}

export async function getCalendar(from, to) {
  if (!from || !to) throw new Error("Параметры from и to обязательны для /owner/calendar");
  const res = await axiosInstance.get("/owner/calendar", { params: { from, to } });
  return res.data.data;
}

export const getSchedule = getCalendar;

// /owner/bookings не существует — используем nearest_bookings из dashboard
export async function getOwnerBookings(filter) {
  const dash = await getDashboardStats();
  const bookings = dash.nearest_bookings ?? [];
  if (!filter || filter === "all") return bookings;
  return bookings.filter((b) => b.status === filter);
}

// Эндпоинта подтверждения нет — заглушка
export async function confirmOwnerBooking(_id) {
  throw new Error("Подтверждение записей временно недоступно");
}

// /bookings/{id}/cancel работает и для владельца
export async function cancelOwnerBooking(id) {
  const res = await axiosInstance.post(`/bookings/${id}/cancel`);
  return res.data;
}

// /owner/services не существует — получаем через barbershops/{slug}
export async function getOwnerServices() {
  const dash = await getDashboardStats();
  const shopName = dash.barbershop?.name;
  if (!shopName) return [];

  const list = await getShops({ search: shopName, per_page: 5 });
  const shops = Array.isArray(list) ? list : list.data ?? [];
  const found = shops.find((s) => s.name === shopName) || shops[0];
  if (!found?.slug) return [];

  const shop = await getShopBySlug(found.slug);
  return (shop.services ?? []).flatMap((cat) =>
    (cat.items ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      duration_minutes: item.duration_minutes,
      price: item.price,
      category: { name: cat.category_name },
    }))
  );
}

// Эндпоинта удаления нет — заглушка
export async function deleteOwnerService(_id) {
  throw new Error("Удаление услуг временно недоступно");
}

// Нужен: POST /owner/services
export async function createOwnerService(_data) {
  throw new Error("POST /owner/services не реализован на бэке");
}

// Нужен: POST /owner/bookings/{id}/complete
export async function completeOwnerBooking(id) {
  const res = await axiosInstance.post(`/owner/bookings/${id}/complete`);
  return res.data;
}

// /owner/analytics не существует — маппим данные из /owner/dashboard
export async function getAnalytics(_period) {
  const dash = await getDashboardStats();
  return {
    stats: {
      revenue_total: dash.week_revenue?.amount ?? 0,
      revenue_change_percent: dash.week_revenue?.delta_pct_vs_prev ?? null,
      bookings_count: dash.today_bookings?.count ?? 0,
      bookings_change_percent: null,
      new_clients: dash.new_clients_this_week ?? 0,
      new_clients_change_percent: null,
    },
    revenue_by_day: (dash.revenue_last_7_days ?? []).map((d) => ({
      date: d.date,
      amount: d.revenue,
    })),
  };
}

export async function getBookings(filter) {
  const params = {};
  if (filter) params.filter = filter;
  const res = await axiosInstance.get("/bookings", { params });
  const raw = res.data.data;
  return Array.isArray(raw) ? raw : raw.data ?? [];
}
