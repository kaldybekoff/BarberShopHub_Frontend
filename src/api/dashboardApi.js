import axiosInstance from "./axiosInstance";

export async function getDashboardStats() {
  const res = await axiosInstance.get("/owner/dashboard");
  return res.data.data;
}

export async function getSchedule(from, to) {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const res = await axiosInstance.get("/owner/schedule", { params });
  return res.data.data;
}

export async function getOwnerBookings(filter) {
  const params = {};
  if (filter && filter !== "all") params.filter = filter;
  const res = await axiosInstance.get("/owner/bookings", { params });
  const raw = res.data.data;
  return Array.isArray(raw) ? raw : raw.data ?? [];
}

export async function confirmOwnerBooking(id) {
  const res = await axiosInstance.post(`/owner/bookings/${id}/confirm`);
  return res.data;
}

export async function cancelOwnerBooking(id) {
  const res = await axiosInstance.post(`/owner/bookings/${id}/cancel`);
  return res.data;
}

export async function getOwnerServices() {
  const res = await axiosInstance.get("/owner/services");
  const raw = res.data.data;
  return Array.isArray(raw) ? raw : raw.data ?? [];
}

export async function deleteOwnerService(id) {
  await axiosInstance.delete(`/owner/services/${id}`);
}

export async function getAnalytics(period = "week") {
  const res = await axiosInstance.get("/owner/analytics", { params: { period } });
  return res.data.data;
}

export async function getBookings(filter) {
  const params = {};
  if (filter) params.filter = filter;
  const res = await axiosInstance.get("/bookings", { params });
  return res.data.data.data;
}
