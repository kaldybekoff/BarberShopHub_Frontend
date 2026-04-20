import axiosInstance from "./axiosInstance";

export async function getMyAppointments(filter = "upcoming") {
  const res = await axiosInstance.get("/bookings", { params: { filter } });
  return res.data.data.data;
}

export async function cancelAppointment(appointmentId) {
  const res = await axiosInstance.post(`/bookings/${appointmentId}/cancel`);
  return res.data;
}

export async function rescheduleAppointment(appointmentId, scheduledAt) {
  const res = await axiosInstance.post(`/bookings/${appointmentId}/reschedule`, {
    scheduled_at: scheduledAt,
  });
  return res.data;
}
