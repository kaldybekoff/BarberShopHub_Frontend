import axiosInstance from "./axiosInstance";

export async function getDashboardStats() {
  const res = await axiosInstance.get("/owner/dashboard");
  return res.data.data;
}

export async function getSchedule(from, to) {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const res = await axiosInstance.get("/owner/calendar", { params });
  return res.data.data;
}

export async function getBookings(filter) {
  const params = {};
  if (filter) params.filter = filter;
  const res = await axiosInstance.get("/bookings", { params });
  return res.data.data.data;
}
