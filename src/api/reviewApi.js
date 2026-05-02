import axiosInstance from "./axiosInstance";

export async function getReviews(slug) {
  const res = await axiosInstance.get(`/barbershops/${slug}`);
  return res.data.data.reviews ?? [];
}

export async function createReview({ slug, rating, comment }) {
  const res = await axiosInstance.post(`/barbershops/${slug}/reviews`, { rating, comment });
  return res.data.data;
}

export async function getMyReviews() {
  const res = await axiosInstance.get("/auth/me/reviews");
  const raw = res.data.data;
  return Array.isArray(raw) ? raw : raw.data ?? [];
}
