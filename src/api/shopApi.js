// TODO: заменить на реальный axiosInstance когда будет API
import mockShops from "../data/mockShops";

export async function getShops(filters) {
  await new Promise((res) => setTimeout(res, 600));
  return mockShops;
}

export async function getShopById(shopId) {
  await new Promise((res) => setTimeout(res, 600));

  const shop = mockShops.find((s) => s.id === Number(shopId));
  if (!shop) {
    throw new Error("Барбершоп не найден");
  }

  return shop;
}

export async function getShopServices(shopId) {
  await new Promise((res) => setTimeout(res, 600));

  const shop = mockShops.find((s) => s.id === Number(shopId));
  if (!shop) {
    throw new Error("Барбершоп не найден");
  }

  return shop.services;
}
