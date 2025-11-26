import api from './api'

export const bookService = {
  // Get all books with optional filters
  getAll: (params = {}) => {
    return api.get('/books', { params })
  },

  // Get book by ID
  getById: (id) => {
    return api.get(`/books/${id}`)
  },

  // Search books
  search: (query) => {
    return api.get('/books/search', { params: { q: query } })
  },

  // Get books by category
  getByCategory: (categoryId) => {
    return api.get(`/books/category/${categoryId}`)
  },

  // Admin: Create book
  create: (data) => {
    return api.post('/books', data)
  },

  // Admin: Update book
  update: (id, data) => {
    return api.put(`/books/${id}`, data)
  },

  // Admin: Delete book
  remove: (id) => {
    return api.delete(`/books/${id}`)
  }
}
