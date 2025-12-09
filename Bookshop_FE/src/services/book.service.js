import api from './api'

export const bookService = {
  // Get all books with optional filters
  getAll: (params = {}) => {
    // Backend chỉ hỗ trợ: page, limit, search, sort
    const cleanParams = {}
    
    if (params.page) cleanParams.page = params.page
    if (params.limit) cleanParams.limit = params.limit
    if (params.search && params.search.trim()) cleanParams.search = params.search.trim()
    
    // Map sortBy to backend format
    if (params.sortBy) {
      const sortMap = {
        'price-asc': 'price',
        'price-desc': '-price',
        'sales': '-sales',
        'rating': '-averageRating',
        'newest': '-createdAt'
      }
      cleanParams.sort = sortMap[params.sortBy] || '-createdAt'
    }
    
    return api.get('/books', { params: cleanParams })
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
