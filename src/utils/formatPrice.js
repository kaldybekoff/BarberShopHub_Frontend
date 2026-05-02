function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return "— ₸";
  return Number(amount).toLocaleString("en-US") + "₸";
}

export default formatPrice;
