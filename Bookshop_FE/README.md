# 📚 TiQi Bookstore - Frontend

Ứng dụng web bán sách được xây dựng bằng **React 18** + **Vite** với thiết kế lấy cảm hứng từ Tiki.

## 🚀 Quick Start

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
# Terminal 1: Chạy frontend (port 5173)
npm run dev

# Terminal 2: Chạy mock backend (port 5000)
node server/mock-server.cjs
```

Truy cập: `http://localhost:5173`

## 📦 Tech Stack

- **React 18** - UI Framework
- **Vite 5** - Build tool & Dev server
- **React Router DOM v7** - Client-side routing
- **Ant Design 5** - UI Component library
- **Axios** - HTTP client
- **Redux Toolkit** - State management
- **Express** - Mock backend server

## 🏗️ Cấu trúc dự án

```
Bookshop_FE/
├── src/
│   ├── components/          # Shared components
│   │   ├── layout/          # Header, Footer
│   │   └── ProductDetail/   # Product detail components
│   │
│   ├── pages/               # Route-level pages
│   │   ├── HomePage/
│   │   ├── ProductDetailPage/
│   │   └── ...
│   │
│   ├── features/            # Feature modules
│   │   ├── auth/            # Login, Register
│   │   ├── admin/           # Admin dashboard
│   │   └── ...
│   │
│   ├── services/            # API services
│   │   ├── auth.service.js
│   │   ├── book.service.js
│   │   └── cart.service.js
│   │
│   ├── layouts/             # Layout wrappers
│   │   ├── MainLayout.jsx   # User layout
│   │   └── AdminLayout.jsx  # Admin layout
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx    # Route definitions
│   │
│   └── utils/               # Utilities
│
├── server/
│   └── mock-server.cjs      # Mock backend (Express)
│
└── public/                  # Static assets
```

## 🎯 Features

### ✅ Đã hoàn thành
- **Authentication**: Đăng nhập, đăng ký với JWT
- **Product Detail**: Trang chi tiết sản phẩm theo thiết kế Tiki
  - Gallery ảnh sản phẩm
  - Thông tin sản phẩm chi tiết
  - Panel mua hàng (sticky)
  - Đánh giá khách hàng
  - Sản phẩm tương tự
- **Header**: Tìm kiếm, giỏ hàng, tài khoản
- **Responsive Design**: Mobile-friendly
- **Mock Backend**: Express server với in-memory storage

### 🔜 Roadmap
- Kết nối backend thực
- Shopping cart functionality
- Payment integration
- Order management
- Admin dashboard

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Chạy dev server (port 5173)

# Production
npm run build        # Build cho production
npm run preview      # Preview production build

# Mock Backend
node server/mock-server.cjs    # Start mock API server (port 5000)
```

## 🔌 API Endpoints (Mock Server)

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Books
- `GET /api/books` - Lấy danh sách sách
- `GET /api/books/:id` - Chi tiết sách

### Cart
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart/items` - Thêm vào giỏ

### Admin
- `GET /api/admin/stats` - Thống kê
- `GET /api/admin/users` - Quản lý users
- `GET /api/admin/orders` - Quản lý đơn hàng

## 🌐 Kết nối Backend

### Bước 1: Cấu hình môi trường
Tạo file `.env` tại root:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Bước 2: Start backend server
```bash
# Nếu dùng mock server
node server/mock-server.cjs

# Hoặc nếu có backend riêng
# Chạy backend server của bạn trên port 5000
```

### Bước 3: Start frontend
```bash
npm run dev
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

- **Primary Color**: `#1890ff` (Blue)
- **Accent Color**: `#ff424e` (Red - Buttons)
- **Background**: `#f5f5f5` (Gray)
- **Text**: `#242424` (Dark gray)

## 📄 License

Private project - All rights reserved © 2025 TiQi Bookstore

## 👥 Contact

- Repository: [MSIS207.Q14_Frontend](https://github.com/MinhQuanUIT/MSIS207.Q14_Frontend)
- Owner: MinhQuanUIT
