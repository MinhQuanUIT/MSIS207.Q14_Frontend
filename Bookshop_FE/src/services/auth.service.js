/**
 * Authentication Service
 * Handles all auth-related API calls
 * @see {API_CONTRACT.md} for detailed API documentation
 */

import api from './api'

export const authService = {
  /**
   * User login
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<{token: string, role: string}>}
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    const { token, role } = response.data
    // Save token and role to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    return response
  },

  /**
   * User register
   * @param {Object} userData - Registration data
   * @param {string} userData.name - User name
   * @param {string} userData.email - User email
   * @param {string} userData.phone - User phone (optional)
   * @param {string} userData.password - User password (min 6 chars)
   * @returns {Promise<{token: string, role: string}>}
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    const { token, role } = response.data
    // Save token and role to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    return response
  },

  /**
   * Logout - Clear local storage
   * @returns {Promise<void>}
   */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    return Promise.resolve()
  },

  /**
   * Get current user
   * @returns {Promise<import('axios').AxiosResponse<import('../types/api.types').CurrentUserResponse>>}
   */
  getCurrentUser: () => {
    return api.get('/auth/me')
  },

  /**
   * Refresh token
   * @returns {Promise<import('axios').AxiosResponse>}
   */
  refreshToken: () => {
    return api.post('/auth/refresh')
  },

  /**
   * Update profile
   * @param {Partial<import('../types/api.types').User>} data - Profile data to update
   * @returns {Promise<import('axios').AxiosResponse>}
   */
  updateProfile: (data) => {
    return api.put('/auth/profile', data)
  }
}
