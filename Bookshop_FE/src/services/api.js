import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request interceptor - attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
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
    // Don't redirect if user simply isn't logged in (e.g., accessing protected route)
    if (error.response?.status === 401) {
      const token = localStorage.getItem('access_token')
      // Only clear token if user had a token (it expired)
      // Don't redirect here - let components handle navigation
      if (token) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      }
    }
    return Promise.reject(error)
  }
)

export default api
