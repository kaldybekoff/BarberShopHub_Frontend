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

export async function confirmOwnerBooking(id) {
  const res = await axiosInstance.post(`/owner/bookings/${id}/confirm`);
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

export async function getAnalytics(period = "week") {
  const res = await axiosInstance.get("/owner/analytics", { params: { period } });
  const d = res.data.data;
  return {
    stats: {
      revenue_total: d.total_revenue ?? 0,
      revenue_change_percent: d.revenue_change_percent ?? null,
      bookings_count: d.total_bookings ?? 0,
      bookings_change_percent: d.bookings_change_percent ?? null,
      new_clients: d.new_clients ?? 0,
      new_clients_change_percent: d.new_clients_change_percent ?? null,
      avg_rating: d.avg_rating ?? null,
      average_check: d.average_check ?? null,
      average_check_change_percent: d.average_check_change_percent ?? null,
    },
    revenue_by_day: (d.revenue_chart ?? []).map((item) => ({
      date: item.date ?? item.label,
      amount: item.amount ?? item.revenue ?? 0,
    })),
    popular_services: (d.top_services ?? []).map((s) => ({
      name: s.name,
      revenue: s.revenue ?? 0,
      count: s.count ?? s.bookings_count ?? 0,
    })),
  };
}

