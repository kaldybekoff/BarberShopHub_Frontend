// TODO: заменить на реальный axiosInstance когда будет API
import mockAppointments from "../data/mockAppointments";

export async function getMyAppointments() {
  await new Promise((res) => setTimeout(res, 600));
  return mockAppointments;
}

export async function cancelAppointment(appointmentId) {
  await new Promise((res) => setTimeout(res, 600));
  return { success: true };
}
