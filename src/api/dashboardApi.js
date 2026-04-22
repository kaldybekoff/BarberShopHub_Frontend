import axiosInstance from "./axiosInstance";

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

export async function getOwnerBookings(filter) {
  const params = {};
  if (filter && filter !== "all") params.filter = filter;
  const res = await axiosInstance.get("/owner/bookings", { params });
  const raw = res.data.data;
  return Array.isArray(raw) ? raw : raw.data ?? [];
}

export async function cancelOwnerBooking(id) {
  const res = await axiosInstance.post(`/owner/bookings/${id}/cancel`);
  return res.data;
}

export async function completeOwnerBooking(id) {
  const res = await axiosInstance.post(`/owner/bookings/${id}/complete`);
  return res.data;
}

export async function getOwnerServices() {
  const res = await axiosInstance.get("/owner/services");
  const raw = res.data.data;
  const list = Array.isArray(raw) ? raw : raw.data ?? [];
  return list.map((item) => ({
    id: item.id,
    name: item.name,
    duration_minutes: item.duration_minutes,
    price: item.price,
    category: { name: item.category_name ?? "Прочее" },
  }));
}

export async function createOwnerService(data) {
  const res = await axiosInstance.post("/owner/services", data);
  return res.data.data;
}

export async function updateOwnerService(id, data) {
  const res = await axiosInstance.put(`/owner/services/${id}`, data);
  return res.data.data;
}

export async function deleteOwnerService(id) {
  await axiosInstance.delete(`/owner/services/${id}`);
}

// /owner/analytics ещё не добавлен — маппим из /owner/dashboard
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
