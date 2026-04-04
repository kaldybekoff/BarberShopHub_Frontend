// TODO: заменить на реальный axiosInstance когда будет API
import mockShops from "../data/mockShops";

export async function getReviews(shopId) {
  await new Promise((res) => setTimeout(res, 600));

  const shop = mockShops.find((s) => s.id === Number(shopId));
  if (!shop) {
    return [];
  }

  return shop.reviews;
}

export async function createReview(reviewData) {
  await new Promise((res) => setTimeout(res, 600));

  return {
    id: Math.floor(Math.random() * 1000) + 100,
    date: new Date().toLocaleDateString("ru-RU"),
    ...reviewData,
  };
}
