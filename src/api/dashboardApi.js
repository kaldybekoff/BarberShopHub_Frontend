// TODO: заменить на реальный axiosInstance когда будет API
import { statsData, scheduleData, bookingsList } from "../data/mockDashboardStats";

export async function getDashboardStats() {
  await new Promise((res) => setTimeout(res, 600));
  return statsData;
}

export async function getSchedule() {
  await new Promise((res) => setTimeout(res, 600));
  return scheduleData;
}

export async function getBookings() {
  await new Promise((res) => setTimeout(res, 600));
  return bookingsList;
}
