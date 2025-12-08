import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request interceptor - attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only auto-logout and redirect if it's a token expiration issue
    if (error.response?.status === 401) {
      const token = localStorage.getItem('token')
      // Clear token and role if user had a token (it expired)
      if (token) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      }
    }
    return Promise.reject(error)
  }
)

export default api
