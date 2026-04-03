function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return "— ₸";
  return Number(amount).toLocaleString("ru-RU") + "₸";
}

export default formatPrice;
