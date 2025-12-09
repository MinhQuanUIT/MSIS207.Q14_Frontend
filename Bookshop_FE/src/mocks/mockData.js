// Mock Books Data
export const mockBooks = [
  {
    _id: '1',
    title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
    author: 'Nguyễn Nhật Ánh',
    price: 85000,
    oldPrice: 100000,
    image: 'https://picsum.photos/seed/book1/400/600',
    rating: 9.2,
    sales: 1250,
    stock: 45,
    inStock: true,
    description: 'Tác phẩm văn học Việt Nam đầy cảm xúc về tuổi thơ',
    reviews: [
      { user: 'User1', rating: 9, comment: 'Rất hay!' },
      { user: 'User2', rating: 10, comment: 'Tuyệt vời!' }
    ]
  },
  {
    _id: '2',
    title: 'Mắt Biếc',
    author: 'Nguyễn Nhật Ánh',
    price: 92000,
    oldPrice: 110000,
    image: 'https://picsum.photos/seed/book2/400/600',
    rating: 9.5,
    sales: 2100,
    stock: 60,
    inStock: true,
    description: 'Câu chuyện tình đẹp và cảm động',
    reviews: []
  },
  {
    _id: '3',
    title: 'Cho Tôi Xin Một Vé Đi Tuổi Thơ',
    author: 'Nguyễn Nhật Ánh',
    price: 78000,
    oldPrice: 95000,
    image: 'https://picsum.photos/seed/book3/400/600',
    rating: 8.8,
    sales: 980,
    stock: 30,
    inStock: true,
    description: 'Hồi ức tuổi thơ đẹp đẽ và trong sáng',
    reviews: []
  },
  {
    _id: '4',
    title: 'Harry Potter và Hòn Đá Phù Thủy',
    author: 'J.K. Rowling',
    price: 165000,
    oldPrice: 190000,
    image: 'https://picsum.photos/seed/book4/400/600',
    rating: 9.8,
    sales: 3500,
    stock: 0,
    inStock: false,
    description: 'Phần đầu tiên của series Harry Potter huyền thoại',
    reviews: []
  },
  {
    _id: '5',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 72000,
    oldPrice: 89000,
    image: 'https://picsum.photos/seed/book5/400/600',
    rating: 9.0,
    sales: 5200,
    stock: 120,
    inStock: true,
    description: 'Nghệ thuật giao tiếp và ứng xử',
    reviews: []
  },
  {
    _id: '6',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 68000,
    oldPrice: 85000,
    image: 'https://picsum.photos/seed/book6/400/600',
    rating: 8.5,
    sales: 1800,
    stock: 55,
    inStock: true,
    description: 'Hành trình tìm kiếm ước mơ',
    reviews: []
  },
  {
    _id: '7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 325000,
    oldPrice: 380000,
    image: 'https://picsum.photos/seed/book7/400/600',
    rating: 9.3,
    sales: 650,
    stock: 25,
    inStock: true,
    description: 'Cẩm nang viết code sạch cho lập trình viên',
    reviews: []
  },
  {
    _id: '8',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: 95000,
    oldPrice: 115000,
    image: 'https://picsum.photos/seed/book8/400/600',
    rating: 8.2,
    sales: 1450,
    stock: 40,
    inStock: true,
    description: 'Sách động lực cho giới trẻ',
    reviews: []
  },
  {
    _id: '9',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen Covey',
    price: 155000,
    oldPrice: 180000,
    image: 'https://picsum.photos/seed/book9/400/600',
    rating: 9.1,
    sales: 890,
    stock: 35,
    inStock: true,
    description: '7 thói quen của người thành đạt',
    reviews: []
  },
  {
    _id: '10',
    title: 'Sapiens: Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    price: 198000,
    oldPrice: 230000,
    image: 'https://picsum.photos/seed/book10/400/600',
    rating: 9.6,
    sales: 2300,
    stock: 50,
    inStock: true,
    description: 'Lịch sử tiến hóa của loài người',
    reviews: []
  },
  {
    _id: '11',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 215000,
    oldPrice: 250000,
    image: 'https://picsum.photos/seed/book11/400/600',
    rating: 8.9,
    sales: 720,
    stock: 28,
    inStock: true,
    description: 'Tư duy nhanh và chậm',
    reviews: []
  },
  {
    _id: '12',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 175000,
    oldPrice: 200000,
    image: 'https://picsum.photos/seed/book12/400/600',
    rating: 9.4,
    sales: 1950,
    stock: 65,
    inStock: true,
    description: 'Xây dựng thói quen tốt, phá vỡ thói quen xấu',
    reviews: []
  },
  {
    _id: '13',
    title: 'Tôi Là Bêtô',
    author: 'Nguyễn Nhật Ánh',
    price: 88000,
    oldPrice: 105000,
    image: 'https://picsum.photos/seed/book13/400/600',
    rating: 8.7,
    sales: 1120,
    stock: 42,
    inStock: true,
    description: 'Câu chuyện về tình bạn và tuổi học trò',
    reviews: []
  },
  {
    _id: '14',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    price: 185000,
    oldPrice: 220000,
    image: 'https://picsum.photos/seed/book14/400/600',
    rating: 8.6,
    sales: 580,
    stock: 22,
    inStock: true,
    description: 'Phương pháp khởi nghiệp tinh gọn',
    reviews: []
  },
  {
    _id: '15',
    title: '1984',
    author: 'George Orwell',
    price: 125000,
    oldPrice: 145000,
    image: 'https://picsum.photos/seed/book15/400/600',
    rating: 9.2,
    sales: 1650,
    stock: 38,
    inStock: true,
    description: 'Tiểu thuyết kinh điển về xã hội toàn trị',
    reviews: []
  },
  {
    _id: '16',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 135000,
    oldPrice: 160000,
    image: 'https://picsum.photos/seed/book16/400/600',
    rating: 9.3,
    sales: 1320,
    stock: 0,
    inStock: false,
    description: 'Tiểu thuyết về công lý và đạo đức',
    reviews: []
  },
  {
    _id: '17',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 118000,
    oldPrice: 140000,
    image: 'https://picsum.photos/seed/book17/400/600',
    rating: 8.8,
    sales: 990,
    stock: 33,
    inStock: true,
    description: 'Giấc mơ Mỹ thời kỳ hoàng kim',
    reviews: []
  },
  {
    _id: '18',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 95000,
    oldPrice: 115000,
    image: 'https://picsum.photos/seed/book18/400/600',
    rating: 8.9,
    sales: 1780,
    stock: 48,
    inStock: true,
    description: 'Hành trình tìm kho báu của chàng chăn cừu',
    reviews: []
  },
  {
    _id: '19',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 128000,
    oldPrice: 150000,
    image: 'https://picsum.photos/seed/book19/400/600',
    rating: 8.4,
    sales: 850,
    stock: 29,
    inStock: true,
    description: 'Câu chuyện về sự trưởng thành',
    reviews: []
  },
  {
    _id: '20',
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    price: 98000,
    oldPrice: 120000,
    image: 'https://picsum.photos/seed/book20/400/600',
    rating: 8.7,
    sales: 2450,
    stock: 75,
    inStock: true,
    description: 'Cha giàu, cha nghèo - Bài học về tài chính',
    reviews: []
  }
]

// Mock Cart Data
export const mockCart = {
  items: [
    {
      _id: '1',
      book: mockBooks[0],
      quantity: 2,
      price: mockBooks[0].price
    },
    {
      _id: '2',
      book: mockBooks[1],
      quantity: 1,
      price: mockBooks[1].price
    },
    {
      _id: '3',
      book: mockBooks[6],
      quantity: 1,
      price: mockBooks[6].price
    }
  ],
  totalItems: 4,
  totalPrice: 487000
}

// Helper function to get book by ID
export const getBookById = (id) => {
  return mockBooks.find(book => book._id === id)
}

// Helper function to filter books
export const filterBooks = (params = {}) => {
  let filtered = [...mockBooks]
  
  // Search
  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filtered = filtered.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    )
  }
  
  // Sort
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'sales':
        filtered.sort((a, b) => b.sales - a.sales)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        // Default order
        break
    }
  }
  
  return filtered
}

// Calculate cart totals
export const calculateCartTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  return { totalItems, totalPrice }
}
