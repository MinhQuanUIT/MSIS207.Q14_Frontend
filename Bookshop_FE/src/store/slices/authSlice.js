import { createSlice } from '@reduxjs/toolkit'

/**
 * Auth Slice
 * Quản lý authentication state: user, token, role
 * Sync với localStorage để persist khi reload page
 */

// Load initial state từ localStorage
const loadAuthFromStorage = () => {
  try {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    
    return {
      token: token || null,
      role: role || null,
      isAuthenticated: !!token,
      user: null // Will be fetched from /auth/me later
    }
  } catch (error) {
    return {
      token: null,
      role: null,
      isAuthenticated: false,
      user: null
    }
  }
}

const initialState = loadAuthFromStorage()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login action
    login(state, action) {
      const { token, role, user } = action.payload
      state.token = token
      state.role = role
      state.user = user || null
      state.isAuthenticated = true
      
      // Sync to localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    },

    // Logout action
    logout(state) {
      state.token = null
      state.role = null
      state.user = null
      state.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    },

    // Set user info (sau khi fetch từ /auth/me)
    setUser(state, action) {
      state.user = action.payload
    },

    // Update user info
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },

    // Set token (for refresh token flow)
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    }
  }
})

// Export actions
export const { login, logout, setUser, updateUser, setToken } = authSlice.actions

// Selectors
export const selectAuth = (state) => state.auth
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectRole = (state) => state.auth.role
export const selectIsAdmin = (state) => state.auth.role === 'admin'

// Export reducer
export default authSlice.reducer
