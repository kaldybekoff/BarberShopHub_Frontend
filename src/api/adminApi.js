// TODO: заменить на реальный axiosInstance когда будет API
import { userList, barbershopList, reviewList } from "../data/mockAdminStats";

export async function getUsers() {
  await new Promise((res) => setTimeout(res, 600));
  return userList;
}

export async function getBarbershops() {
  await new Promise((res) => setTimeout(res, 600));
  return barbershopList;
}

export async function getReviews() {
  await new Promise((res) => setTimeout(res, 600));
  return reviewList;
}

export async function blockUser(userId) {
  await new Promise((res) => setTimeout(res, 600));
  return { success: true };
}

export async function blockBarbershop(shopId) {
  await new Promise((res) => setTimeout(res, 600));
  return { success: true };
}
