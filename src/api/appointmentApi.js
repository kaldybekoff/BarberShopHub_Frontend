import axiosInstance from "./axiosInstance";

export async function getMyAppointments(filter = "upcoming", page = 1) {
  const res = await axiosInstance.get("/bookings", {
    params: { filter, page, per_page: 10 },
  });
  const raw = res.data.data;
  return {
    data: raw.data ?? [],
    meta: {
      current_page: raw.current_page ?? 1,
      last_page: raw.last_page ?? 1,
      total: raw.total ?? 0,
    },
  };
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
