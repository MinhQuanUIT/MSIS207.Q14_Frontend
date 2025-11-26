/**
 * Format price to Vietnamese currency
 * @param {number} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
  if (!price) return '0đ'
  return `${price.toLocaleString('vi-VN')}đ`
}

/**
 * Calculate discount percentage
 * @param {number} oldPrice 
 * @param {number} newPrice 
 * @returns {number}
 */
export const calculateDiscount = (oldPrice, newPrice) => {
  if (!oldPrice || !newPrice) return 0
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
}
