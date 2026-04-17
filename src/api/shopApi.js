import axiosInstance from "./axiosInstance";

export async function getShops(filters = {}) {
  const params = {};
  if (filters.search) params.search = filters.search;
  if (filters.is_open !== undefined) params.is_open = filters.is_open;
  if (filters.order_by) params.order_by = filters.order_by;
  if (filters.user_lat) params.user_lat = filters.user_lat;
  if (filters.user_lng) params.user_lng = filters.user_lng;
  if (filters.per_page) params.per_page = filters.per_page;
  if (filters.page) params.page = filters.page;

  const res = await axiosInstance.get("/barbershops", { params });
  return res.data.data;
}

export async function getShopBySlug(slug) {
  const res = await axiosInstance.get(`/barbershops/${slug}`);
  return res.data.data;
}

export async function getShopById(slugOrId) {
  return getShopBySlug(slugOrId);
}

export async function getShopServices(slug) {
  const shop = await getShopBySlug(slug);
  return shop.services;
}
