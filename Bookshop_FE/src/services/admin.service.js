import api from './api'

export const adminService = {
  // Dashboard stats
  getStats: () => {
    return api.get('/admin/stats')
  },

  // Users management
  getUsers: (params) => {
    return api.get('/admin/users', { params })
  },

  getUserById: (id) => {
    return api.get(`/admin/users/${id}`)
  },

  updateUser: (id, data) => {
    return api.put(`/admin/users/${id}`, data)
  },

  deleteUser: (id) => {
    return api.delete(`/admin/users/${id}`)
  },

  // Orders management
  getOrders: (params) => {
    return api.get('/admin/orders', { params })
  },

  getOrderById: (id) => {
    return api.get(`/admin/orders/${id}`)
  },

  updateOrderStatus: (id, status) => {
    return api.put(`/admin/orders/${id}/status`, { status })
  },

  // Inventory
  getInventory: () => {
    return api.get('/admin/inventory')
  },

  updateStock: (bookId, quantity) => {
    return api.put(`/admin/inventory/${bookId}`, { quantity })
  }
}
