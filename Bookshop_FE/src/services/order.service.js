import api from './api'

/**
 * Order Service
 * Handles all order-related API calls
 * Note: Backend order routes not implemented yet
 */
export const orderService = {
  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @param {Array} orderData.items - Array of {book, qty, price}
   * @param {Object} orderData.shippingInfo - Shipping information
   * @param {number} orderData.totalPrice - Total order price
   * @returns {Promise<Object>} Created order
   */
  create: (orderData) => {
    return api.post('/orders', orderData)
  },

  /**
   * Get all orders for current user
   * @returns {Promise<Array>} User's orders
   */
  getMyOrders: () => {
    return api.get('/orders/my-orders')
  },

  /**
   * Get order by ID
   * @param {string} id - Order ID
   * @returns {Promise<Object>} Order details
   */
  getById: (id) => {
    return api.get(`/orders/${id}`)
  },

  /**
   * Update order status
   * @param {string} id - Order ID
   * @param {string} status - New status (pending/paid/delivered/cancelled)
   * @returns {Promise<Object>} Updated order
   */
  updateStatus: (id, status) => {
    return api.put(`/orders/${id}/status`, { status })
  },

  /**
   * Cancel order
   * @param {string} id - Order ID
   * @returns {Promise<Object>} Cancelled order
   */
  cancel: (id) => {
    return orderService.updateStatus(id, 'cancelled')
  },

  /**
   * Admin: Get all orders
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} All orders
   */
  getAll: (params = {}) => {
    return api.get('/orders', { params })
  },

  /**
   * Admin: Delete order
   * @param {string} id - Order ID
   * @returns {Promise<Object>} Delete confirmation
   */
  remove: (id) => {
    return api.delete(`/orders/${id}`)
  }
}

export default orderService
