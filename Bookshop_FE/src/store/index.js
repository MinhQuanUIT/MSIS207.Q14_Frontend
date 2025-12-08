import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

/**
 * Redux Store Configuration
 * Centralized state management cho:
 * - auth: user authentication & authorization
 * - cart: shopping cart management
 */

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['auth/login', 'auth/setUser'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user.createdAt', 'auth.user.updatedAt']
      }
    })
})

export default store
