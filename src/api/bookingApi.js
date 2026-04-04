// TODO: заменить на реальный axiosInstance когда будет API

const allSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

export async function getAvailableSlots(shopId, date) {
  await new Promise((res) => setTimeout(res, 600));
  // имитируем что некоторые слоты заняты
  return allSlots.filter((_, index) => index % 3 !== 1);
}

export async function createBooking(bookingData) {
  await new Promise((res) => setTimeout(res, 600));

  return {
    id: Math.floor(Math.random() * 1000) + 100,
    status: "confirmed",
    ...bookingData,
  };
}
