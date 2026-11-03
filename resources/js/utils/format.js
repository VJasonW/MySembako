/**
 * Utility functions for currency, numbers, and dates (id-ID locale)
 */

export const parsePrice = (priceVal) => {
  if (typeof priceVal === "number") return priceVal;
  if (!priceVal) return 0;
  const cleaned = String(priceVal).replace(/Rp\s?|\.|\s/g, "").replace(",", ".");
  const parsed = Number(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const formatRupiah = (number) => {
  const num = typeof number === "number" ? number : parsePrice(number);
  return "Rp " + num.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatDate = (dateInput, options = {}) => {
  if (!dateInput) return "-";
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) {
      // If it's already a formatted string, return as is
      return String(dateInput);
    }
    const defaultOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options,
    };
    return new Intl.DateTimeFormat("id-ID", defaultOptions).format(date);
  } catch (error) {
    return String(dateInput);
  }
};
