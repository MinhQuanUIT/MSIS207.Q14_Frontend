/**
 * Mock Authentication Service
 * Simulates backend API for testing without running backend server
 */

// Mock users database
const mockUsers = [
  {
    _id: 'user1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin123', // In real app, this would be hashed
    phone: '0123456789',
    role: 'admin',
    isActive: true
  },
  {
    _id: 'user2',
    name: 'Test User',
    email: 'user@gmail.com',
    password: '123456',
    phone: '0987654321',
    role: 'user',
    isActive: true
  }
]

// Simulate JWT token generation
const generateMockToken = (user) => {
  return `mock_token_${user._id}_${Date.now()}`
}

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockAuthService = {
  /**
   * Mock login
   */
  login: async (credentials) => {
    await delay(500) // Simulate network delay
    
    const user = mockUsers.find(u => u.email === credentials.email)
    
    if (!user) {
      throw new Error('Invalid login credentials')
    }
    
    if (user.password !== credentials.password) {
      throw new Error('Invalid login credentials')
    }
    
    const token = generateMockToken(user)
    
    // Save to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', user.role)
    localStorage.setItem('mockUser', JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive
    }))
    
    return {
      data: {
        token,
        role: user.role
      }
    }
  },

  /**
   * Mock register
   */
  register: async (userData) => {
    await delay(500)
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }
    
    // Create new user
    const newUser = {
      _id: `user${mockUsers.length + 1}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      role: 'user',
      isActive: true
    }
    
    mockUsers.push(newUser)
    
    const token = generateMockToken(newUser)
    
    // Save to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', newUser.role)
    localStorage.setItem('mockUser', JSON.stringify({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isActive: newUser.isActive
    }))
    
    return {
      data: {
        token,
        role: newUser.role
      }
    }
  },

  /**
   * Mock logout
   */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('mockUser')
    return Promise.resolve()
  },

  /**
   * Mock get profile
   */
  getProfile: async () => {
    await delay(300)
    
    const mockUser = localStorage.getItem('mockUser')
    if (!mockUser) {
      throw new Error('Not authenticated')
    }
    
    return {
      data: {
        success: true,
        data: JSON.parse(mockUser)
      }
    }
  }
}

export default mockAuthService
