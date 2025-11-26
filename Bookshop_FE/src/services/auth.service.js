import api from './api'

export const authService = {
  // User login
  login: (credentials) => {
    return api.post('/auth/login', credentials)
  },

  // User register
  register: (userData) => {
    return api.post('/auth/register', userData)
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    return Promise.resolve()
  },

  // Get current user
  getCurrentUser: () => {
    return api.get('/auth/me')
  },

  // Refresh token
  refreshToken: () => {
    return api.post('/auth/refresh')
  },

  // Update profile
  updateProfile: (data) => {
    return api.put('/auth/profile', data)
  }
}
