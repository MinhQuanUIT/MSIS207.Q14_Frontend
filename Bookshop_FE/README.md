# 📚 TiQiShop Bookstore - Frontend

React-based bookstore application với kiến trúc module hóa, Tiki-inspired UI.

## 🏗️ Kiến trúc dự án

```
src/
├── layouts/              # Layout components
│   ├── MainLayout.jsx    # User layout (Header + Footer)
│   └── AdminLayout.jsx   # Admin layout (Sidebar)
│
├── routes/
│   └── AppRoutes.jsx     # Định nghĩa tất cả routes
│
├── components/
│   ├── layout/           # Header, Footer
│   ├── navbar/           # NavbarComponent, CategoryMenu
│   ├── product/          # CardComponent, SliderComponent, TypeProduct
│   └── common/           # IconButton, Loading, Modal
│
├── features/             # Feature modules
│   ├── books/            # Quản lý sách
│   ├── auth/             # Đăng nhập/Đăng ký
│   ├── cart/             # Giỏ hàng
│   └── admin/            # Admin dashboard
│
├── services/             # API communication layer
│   ├── api.js            # Axios instance + interceptors
│   ├── book.service.js   # Book APIs
│   ├── auth.service.js   # Authentication APIs
│   ├── cart.service.js   # Cart APIs
│   └── admin.service.js  # Admin APIs
│
├── hooks/                # Custom React hooks
├── store/                # Redux store (future)
├── utils/                # Utility functions
└── styles/               # Global CSS
```

## 🚀 Cài đặt & Chạy

### Prerequisites
- Node.js >= 16
- npm hoặc yarn

### Installation

\`\`\`bash
# Clone repository
git clone <repo-url>

# Vào thư mục project
cd Bookshop_FE

# Cài đặt dependencies
npm install

# Copy file môi trường
cp .env.example .env

# Chạy development server
npm run dev
\`\`\`

Server sẽ chạy tại: `http://localhost:5173`

## 📍 Routes

### User Routes
- `/` - Trang chủ
- `/books` - Danh sách tất cả sách
- `/books/:id` - Chi tiết sách
- `/cart` - Giỏ hàng
- `/login` - Đăng nhập
- `/register` - Đăng ký

### Admin Routes
- `/admin` - Dashboard
- `/admin/books` - Quản lý sách
- `/admin/users` - Quản lý người dùng
- `/admin/orders` - Quản lý đơn hàng
- `/admin/reports` - Báo cáo

## 🔧 Services Layer

### API Configuration
File `services/api.js` tạo axios instance với:
- Base URL từ environment variable
- Auto-attach JWT token
- Error handling (401 → redirect login)

### Sử dụng Services

\`\`\`jsx
import { bookService } from '@/services/book.service'

// Get all books
const books = await bookService.getAll()

// Get book by ID
const book = await bookService.getById('123')

// Search
const results = await bookService.search('react')
\`\`\`

## 🎨 UI Components

### CardComponent
Hiển thị thông tin sách với Tiki-inspired design:
- Image + badges overlay
- Title, author, rating
- Price (old price + discount)
- Promos & shipping info

### NavbarComponent
Left sidebar với collapsible categories

### SliderComponent
React-slick carousel cho promotional banners

## 🔐 Authentication Flow

1. User login → `authService.login()`
2. Backend trả về `{ token, user }`
3. Store token vào localStorage
4. Attach token vào mọi API request
5. 401 error → auto logout + redirect

## 🛒 Cart Flow

1. Add to cart → `cartService.addItem(bookId, quantity)`
2. Update quantity → `cartService.updateItem(itemId, quantity)`
3. Remove → `cartService.removeItem(itemId)`
4. Checkout → `cartService.checkout(orderData)`

## 👨‍💼 Admin Features

- **Dashboard**: Thống kê tổng quan (books, users, orders, revenue)
- **Books Management**: CRUD operations cho sách
- **Users Management**: Quản lý người dùng
- **Orders Management**: Xử lý đơn hàng
- **Reports**: Báo cáo doanh thu

## 📦 Dependencies

### Core
- `react` - UI framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `antd` - UI component library

### Styling
- `react-slick` - Carousel
- `slick-carousel` - Carousel CSS

### Dev
- `vite` - Build tool
- `@vitejs/plugin-react` - Vite React plugin

## 🌐 Environment Variables

\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TiQiShop Bookstore
\`\`\`

## 📝 Coding Standards

### Component Structure
\`\`\`jsx
import React, { useState, useEffect } from 'react'
import { service } from '@/services/...'
import './Component.css'

export default function Component() {
  // State
  // Effects
  // Handlers
  // Render
}
\`\`\`

### File Naming
- Components: `PascalCase.jsx`
- Services: `camelCase.service.js`
- Utils: `camelCase.js`
- CSS: match component name

## 🚧 TODO / Roadmap

- [ ] Implement Redux Toolkit cho state management
- [ ] Add search functionality với debounce
- [ ] Pagination cho book list
- [ ] Image upload cho admin
- [ ] Order tracking
- [ ] Payment integration
- [ ] Email notifications
- [ ] Reviews & ratings system

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

---

**Developed with ❤️ by TiQiShop Team**
