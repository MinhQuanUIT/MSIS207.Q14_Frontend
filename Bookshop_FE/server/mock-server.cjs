const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { loadUsers, saveUsers, addUser, clearUsers } = require('./utils/fileStorage')

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Storage
let users = loadUsers() // Load từ file khi khởi động
const books = []

// Helper to find user by email
const findUserByEmail = (email) => users.find(u => u.email === email)

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password } = req.body

  console.log('📝 Registration request:', { name, email, phone })

  // Validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Vui lòng điền đầy đủ thông tin!' 
    })
  }

  // Check if email already exists
  if (findUserByEmail(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Email đã được sử dụng!' 
    })
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone,
    password, // In production, hash this!
    role: 'user',
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveUsers(users) // Lưu vào file

  console.log('✅ User registered successfully:', newUser.email)
  console.log('📊 Total users:', users.length)

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser

  res.status(201).json({
    success: true,
    message: 'Đăng ký thành công!',
    user: userWithoutPassword
  })
})

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  // Reload users từ file để có data mới nhất
  users = loadUsers()

  console.log('🔐 Login request:', email)

  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Vui lòng nhập email và mật khẩu!' 
    })
  }

  const user = findUserByEmail(email)

  if (!user || user.password !== password) {
    return res.status(401).json({ 
      success: false,
      message: 'Email hoặc mật khẩu không đúng!' 
    })
  }

  console.log('✅ User logged in:', user.email)

  // Generate fake token
  const token = `mock-token-${user.id}-${Date.now()}`

  const { password: _, ...userWithoutPassword } = user

  res.json({
    success: true,
    message: 'Đăng nhập thành công!',
    access_token: token,
    user: userWithoutPassword
  })
})

// Get current user
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Chưa đăng nhập!' 
    })
  }

  // Extract user ID from mock token
  const userId = parseInt(token.split('-')[2])
  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(401).json({ 
      success: false,
      message: 'Token không hợp lệ!' 
    })
  }

  const { password: _, ...userWithoutPassword } = user

  res.json({
    success: true,
    user: userWithoutPassword
  })
})

// ==================== BOOK ROUTES ====================

// Get all books
app.get('/api/books', (req, res) => {
  const { search, category, page = 1, limit = 16 } = req.query

  let filteredBooks = [...books]

  if (search) {
    filteredBooks = filteredBooks.filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (category) {
    filteredBooks = filteredBooks.filter(book => book.category === category)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + parseInt(limit)
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

  res.json({
    success: true,
    data: paginatedBooks,
    total: filteredBooks.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredBooks.length / limit)
  })
})

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b._id === req.params.id)

  if (!book) {
    return res.status(404).json({ 
      success: false,
      message: 'Không tìm thấy sách!' 
    })
  }

  res.json({
    success: true,
    data: book
  })
})

// ==================== CART ROUTES ====================

// In-memory cart
const carts = {}

app.get('/api/cart', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  const userId = token ? parseInt(token.split('-')[2]) : null

  if (!userId) {
    return res.status(401).json({ 
      success: false,
      message: 'Chưa đăng nhập!' 
    })
  }

  const cart = carts[userId] || { items: [], total: 0 }

  res.json({
    success: true,
    data: cart
  })
})

app.post('/api/cart/items', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  const userId = token ? parseInt(token.split('-')[2]) : null
  const { bookId, quantity } = req.body

  if (!userId) {
    return res.status(401).json({ 
      success: false,
      message: 'Chưa đăng nhập!' 
    })
  }

  if (!carts[userId]) {
    carts[userId] = { items: [], total: 0 }
  }

  const book = books.find(b => b._id === bookId)
  if (!book) {
    return res.status(404).json({ 
      success: false,
      message: 'Không tìm thấy sách!' 
    })
  }

  const existingItem = carts[userId].items.find(item => item.bookId === bookId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    carts[userId].items.push({ bookId, quantity, book })
  }

  res.json({
    success: true,
    message: 'Đã thêm vào giỏ hàng!',
    data: carts[userId]
  })
})

// ==================== ADMIN ROUTES (DEV ONLY) ====================

// Reset database (for testing/development only)
app.post('/api/admin/reset-db', (req, res) => {
  // Clear all users
  users.length = 0
  clearUsers() // Xóa file
  // Clear all carts
  Object.keys(carts).forEach(key => delete carts[key])
  
  console.log('🔄 Database reset! All users cleared from file.')
  
  res.json({
    success: true,
    message: 'Database đã được reset. Tất cả user đã xóa.'
  })
})

// Get all users (dev only - to verify registration)
app.get('/api/admin/users', (req, res) => {
  // Reload users từ file
  users = loadUsers()
  
  res.json({
    success: true,
    data: users.map(u => {
      const { password: _, ...userWithoutPassword } = u
      return userWithoutPassword
    })
  })
})

// ==================== SEED DATA ====================

// Create some sample books
const sampleBooks = [
  {
    _id: 'book-1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Công nghệ',
    price: 250000,
    oldPrice: 300000,
    image: 'https://via.placeholder.com/400x500/4CAF50/fff?text=Clean+Code',
    rating: 4.8,
    sold: 1250,
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn\'t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship.',
    stock: 50,
    badges: ['CHÍNH HÃNG', 'BEST SELLER']
  },
  {
    _id: 'book-2',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    category: 'Công nghệ',
    price: 280000,
    oldPrice: 350000,
    image: 'https://via.placeholder.com/400x500/2196F3/fff?text=Design+Patterns',
    rating: 4.7,
    sold: 980,
    description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to rediscover the design solutions themselves.',
    stock: 35,
    badges: ['CHÍNH HÃNG']
  },
  {
    _id: 'book-3',
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Andrew Hunt, David Thomas',
    category: 'Công nghệ',
    price: 270000,
    oldPrice: 320000,
    image: 'https://via.placeholder.com/400x500/FF9800/fff?text=Pragmatic',
    rating: 4.9,
    sold: 1500,
    description: 'The Pragmatic Programmer is one of those rare tech books you\'ll read, re-read, and read again over the years. Whether you\'re new to the field or an experienced practitioner, you\'ll come away with fresh insights each and every time. Dave Thomas and Andy Hunt wrote the first edition of this influential book in 1999 to help their clients create better software and rediscover the joy of coding.',
    stock: 60,
    badges: ['BEST SELLER', 'RECOMMENDED']
  },
  {
    _id: 'book-4',
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    category: 'Công nghệ',
    price: 295000,
    oldPrice: 380000,
    image: 'https://via.placeholder.com/400x500/9C27B0/fff?text=Refactoring',
    rating: 4.6,
    sold: 720,
    description: 'For more than twenty years, experienced programmers worldwide have relied on Martin Fowler\'s Refactoring to improve the design of existing code and to enhance software maintainability, as well as to make existing code easier to understand.',
    stock: 42,
    badges: ['CHÍNH HÃNG']
  },
  {
    _id: 'book-5',
    title: 'Head First Design Patterns',
    author: 'Eric Freeman, Elisabeth Robson',
    category: 'Công nghệ',
    price: 265000,
    oldPrice: 315000,
    image: 'https://via.placeholder.com/400x500/F44336/fff?text=Head+First',
    rating: 4.5,
    sold: 890,
    description: 'At any given moment, someone struggles with the same software design problems you have. And, chances are, someone else has already solved your problem. This edition of Head First Design Patterns—now updated for Java 8—shows you the tried-and-true, road-tested patterns used by developers to create functional, elegant, reusable, and flexible software.',
    stock: 28,
    badges: ['RECOMMENDED']
  },
  {
    _id: 'book-6',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Lập trình Web',
    price: 220000,
    oldPrice: 270000,
    image: 'https://via.placeholder.com/400x500/FFEB3B/333?text=JS+Good+Parts',
    rating: 4.4,
    sold: 1120,
    description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable.',
    stock: 55,
    badges: ['CLASSIC']
  },
  {
    _id: 'book-7',
    title: 'You Don\'t Know JS: Scope & Closures',
    author: 'Kyle Simpson',
    category: 'Lập trình Web',
    price: 185000,
    oldPrice: 230000,
    image: 'https://via.placeholder.com/400x500/00BCD4/fff?text=YDKJS',
    rating: 4.7,
    sold: 1340,
    description: 'No matter how much experience you have with JavaScript, odds are you don\'t fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer.',
    stock: 78,
    badges: ['BEST SELLER', 'RECOMMENDED']
  },
  {
    _id: 'book-8',
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marijn Haverbeke',
    category: 'Lập trình Web',
    price: 240000,
    oldPrice: 295000,
    image: 'https://via.placeholder.com/400x500/607D8B/fff?text=Eloquent+JS',
    rating: 4.6,
    sold: 950,
    description: 'JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
    stock: 64,
    badges: ['CHÍNH HÃNG']
  },
  {
    _id: 'book-9',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    category: 'Thuật toán',
    price: 450000,
    oldPrice: 550000,
    image: 'https://via.placeholder.com/400x500/3F51B5/fff?text=CLRS',
    rating: 4.9,
    sold: 2100,
    description: 'Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.',
    stock: 25,
    badges: ['BEST SELLER', 'CLASSIC', 'RECOMMENDED']
  },
  {
    _id: 'book-10',
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    category: 'Phỏng vấn',
    price: 320000,
    oldPrice: 400000,
    image: 'https://via.placeholder.com/400x500/E91E63/fff?text=CTCI',
    rating: 4.8,
    sold: 3200,
    description: 'I am not a recruiter. I am a software engineer. And as such, I know what it\'s like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard. I\'ve been through this as a candidate and as an interviewer. Cracking the Coding Interview, 6th Edition is here to help you through this process.',
    stock: 95,
    badges: ['BEST SELLER', 'MUST HAVE']
  },
  {
    _id: 'book-11',
    title: 'The Art of Computer Programming, Vol. 1',
    author: 'Donald E. Knuth',
    category: 'Khoa học máy tính',
    price: 520000,
    oldPrice: 650000,
    image: 'https://via.placeholder.com/400x500/795548/fff?text=TAOCP',
    rating: 5.0,
    sold: 450,
    description: 'The bible of all fundamental algorithms and the work that taught many of today\'s software developers most of what they know about computer programming. Byte, September 1995. This first volume in the series begins with basic programming concepts and techniques.',
    stock: 12,
    badges: ['CLASSIC', 'LEGENDARY']
  },
  {
    _id: 'book-12',
    title: 'System Design Interview',
    author: 'Alex Xu',
    category: 'Kiến trúc hệ thống',
    price: 380000,
    oldPrice: 480000,
    image: 'https://via.placeholder.com/400x500/FF5722/fff?text=System+Design',
    rating: 4.7,
    sold: 1580,
    description: 'System design interviews are the most difficult to tackle of all technical interview questions. This book is Volume 1 of the System Design Interview - An insider\'s guide series that provides a reliable strategy and knowledge base for approaching a broad range of system design questions.',
    stock: 48,
    badges: ['TRENDING', 'RECOMMENDED']
  }
]

books.push(...sampleBooks)

console.log(`📚 Loaded ${books.length} sample books`)

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log('='.repeat(50))
  console.log(`🚀 Mock Backend Server is running!`)
  console.log(`📍 URL: http://localhost:${PORT}`)
  console.log(`📝 API: http://localhost:${PORT}/api`)
  console.log('='.repeat(50))
  console.log('Available endpoints:')
  console.log('  POST /api/auth/register')
  console.log('  POST /api/auth/login')
  console.log('  GET  /api/auth/me')
  console.log('  GET  /api/books')
  console.log('  GET  /api/books/:id')
  console.log('  GET  /api/cart')
  console.log('  POST /api/cart/items')
  console.log('')
  console.log('DEV/TEST endpoints:')
  console.log('  POST /api/admin/reset-db (clear all users)')
  console.log('  GET  /api/admin/users (list all registered users)')
  console.log('='.repeat(50))
})
