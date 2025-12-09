import api from './api'

export const userService = {
  // Get current user profile
  getProfile: () => {
    return api.get('/auth/profile')
  },

  // Update user profile
  updateProfile: (userId, data) => {
    return api.put(`/users/${userId}`, data)
  },

  // Change password (if backend supports)
  changePassword: (userId, data) => {
    return api.put(`/users/${userId}`, data)
  }
}

export default userService
