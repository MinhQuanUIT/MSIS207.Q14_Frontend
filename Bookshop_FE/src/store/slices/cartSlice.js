import { createSlice } from '@reduxjs/toolkit'

/**
 * Cart Slice
 * Quản lý cart state: items, totalItems, totalPrice
 * Sẽ sync với backend sau khi login
 */

const initialState = {
  items: [], // [{ _id, book: {}, quantity, price }]
  totalItems: 0,
  totalPrice: 0,
  loading: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Set entire cart (from backend)
    setCart(state, action) {
      state.items = action.payload.items || []
      calculateTotals(state)
    },

    // Add item to cart
    addItem(state, action) {
      const { book, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.book._id === book._id)

      if (existingItem) {
        // Increase quantity if item exists
        existingItem.quantity += quantity
      } else {
        // Add new item
        state.items.push({
          _id: `temp_${Date.now()}`, // Temporary ID, will be replaced by backend
          book,
          quantity,
          price: book.price
        })
      }
      calculateTotals(state)
    },

    // Remove item from cart
    removeItem(state, action) {
      const itemId = action.payload
      state.items = state.items.filter(item => item._id !== itemId)
      calculateTotals(state)
    },

    // Update item quantity
    updateQuantity(state, action) {
      const { itemId, quantity } = action.payload
      const item = state.items.find(item => item._id === itemId)
      
      if (item) {
        item.quantity = quantity
        calculateTotals(state)
      }
    },

    // Clear entire cart
    clearCart(state) {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },

    // Set loading state
    setCartLoading(state, action) {
      state.loading = action.payload
    }
  }
})

// Helper function to calculate totals
function calculateTotals(state) {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  
  state.totalPrice = state.items.reduce((sum, item) => {
    // Parse price string to number (remove "đ" and convert)
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^\d]/g, ''))
      : item.price
    return sum + (price * item.quantity)
  }, 0)
}

// Export actions
export const { 
  setCart, 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  setCartLoading 
} = cartSlice.actions

// Selectors
export const selectCart = (state) => state.cart
export const selectCartItems = (state) => state.cart.items
export const selectTotalItems = (state) => state.cart.totalItems
export const selectTotalPrice = (state) => state.cart.totalPrice
export const selectCartLoading = (state) => state.cart.loading

// Export reducer
export default cartSlice.reducer
