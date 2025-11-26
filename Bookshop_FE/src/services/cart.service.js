import api from './api'

export const cartService = {
  // Get cart
  getCart: () => {
    return api.get('/cart')
  },

  // Add item to cart
  addItem: (bookId, quantity = 1) => {
    return api.post('/cart/items', { bookId, quantity })
  },

  // Update cart item quantity
  updateItem: (itemId, quantity) => {
    return api.put(`/cart/items/${itemId}`, { quantity })
  },

  // Remove item from cart
  removeItem: (itemId) => {
    return api.delete(`/cart/items/${itemId}`)
  },

  // Clear cart
  clearCart: () => {
    return api.delete('/cart')
  },

  // Checkout
  checkout: (orderData) => {
    return api.post('/cart/checkout', orderData)
  }
}
