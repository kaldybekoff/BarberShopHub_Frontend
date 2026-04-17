import axiosInstance from "./axiosInstance";

export async function createBooking(bookingData) {
  const res = await axiosInstance.post("/bookings", bookingData);
  return res.data.data;
}

export async function getBookingById(id) {
  const res = await axiosInstance.get(`/bookings/${id}`);
  return res.data.data;
}

export async function rescheduleBooking(id, scheduled_at) {
  const res = await axiosInstance.post(`/bookings/${id}/reschedule`, { scheduled_at });
  return res.data.data;
}

export async function cancelBooking(id) {
  const res = await axiosInstance.post(`/bookings/${id}/cancel`);
  return res.data;
}
