# 📚 TiQi Bookstore - Frontend

> Modern e-commerce platform for book lovers, built with React 18 and Vite, featuring a sleek Tiki-inspired design.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.29.1-0170FE.svg)](https://ant.design/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.10.1-764ABC.svg)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

## 🌐 Live Demo

- **Production:** [https://msis-207-q14-frontend.vercel.app](https://msis-207-q14-frontend.vercel.app)
- **Backend API:** [https://msis207-q14-backend.onrender.com](https://msis207-q14-backend.onrender.com)

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ JWT-based authentication
- ✅ User registration with email validation
- ✅ Secure login/logout functionality
- ✅ Redux state management for auth
- ✅ Role-based access control (User/Admin)
- ✅ Protected routes

### 📖 Product Management
- ✅ Advanced book search with debounce
- ✅ Category-based filtering
- ✅ Product detail page with image gallery
- ✅ Customer reviews and ratings
- ✅ Real-time stock availability
- ✅ Similar products recommendations

### 🛒 Shopping Experience
- ✅ Add to cart functionality
- ✅ Cart management (update quantity, remove items)
- ✅ Real-time cart updates with Redux
- ✅ Persistent cart state
- ✅ Free shipping calculation

### 💳 Checkout & Orders
- ✅ Multi-step checkout process
- ✅ Shipping information form with validation
- ✅ Multiple payment methods (COD, Bank Transfer, MoMo)
- ✅ Order creation and tracking
- ✅ Order history management
- ✅ Order status updates

### 👤 User Account
- ✅ Profile management
- ✅ Order history viewing
- ✅ Account information updates
- ✅ Review submission

### 📱 Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet and desktop optimized
- ✅ Touch-friendly UI components
- ✅ Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MinhQuanUIT/MSIS207.Q14_Frontend.git
cd MSIS207.Q14_Frontend/Bookshop_FE
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_BASE_URL=https://msis207-q14-backend.onrender.com/api
VITE_USE_MOCK_DATA=false

# App Configuration
VITE_APP_NAME=TiQiShop Bookstore
```

4. **Start development server**
```bash
npm run dev
```

Access the application at: `http://localhost:5173`

## 📦 Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 5.0.0 | Build Tool & Dev Server |
| React Router DOM | 7.9.6 | Client-side Routing |
| Redux Toolkit | 2.10.1 | State Management |
| Ant Design | 5.29.1 | UI Component Library |
| Axios | 1.13.2 | HTTP Client |

### Additional Libraries
- **react-slick** - Carousel/Slider components
- **slick-carousel** - Carousel styling
- **Express** - Mock backend server (development)

## 🏗️ Project Structure

```
Bookshop_FE/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Header, Footer, Navigation
│   │   ├── ProductDetail/       # Product detail components
│   │   ├── SliderComponent/     # Image slider
│   │   ├── CardComponent/       # Product card
│   │   └── filters/             # Filter sidebar
│   │
│   ├── features/                # Feature-based modules
│   │   ├── auth/                # Authentication (Login, Register)
│   │   ├── books/               # Book listing and details
│   │   ├── cart/                # Shopping cart
│   │   ├── checkout/            # Checkout process
│   │   ├── account/             # User account management
│   │   └── admin/               # Admin dashboard
│   │
│   ├── layouts/                 # Layout wrappers
│   │   ├── MainLayout.jsx       # User-facing layout
│   │   └── AdminLayout.jsx      # Admin dashboard layout
│   │
│   ├── pages/                   # Page components
│   │   ├── HomePage/            # Landing page
│   │   └── ProductDetailPage/   # Product detail page
│   │
│   ├── services/                # API service layer
│   │   ├── api.js               # Axios configuration
│   │   ├── auth.service.js      # Authentication API
│   │   ├── book.service.js      # Books API
│   │   ├── cart.service.js      # Cart API
│   │   ├── order.service.js     # Orders API
│   │   └── user.service.js      # User API
│   │
│   ├── store/                   # Redux store
│   │   ├── index.js             # Store configuration
│   │   └── slices/              # Redux slices
│   │       ├── authSlice.js     # Authentication state
│   │       └── cartSlice.js     # Cart state
│   │
│   ├── routes/                  # Route definitions
│   │   └── AppRoutes.jsx        # All application routes
│   │
│   ├── utils/                   # Utility functions
│   │   ├── formatPrice.js       # Price formatting
│   │   ├── storage.js           # LocalStorage helpers
│   │   └── apiHelpers.js        # API utilities
│   │
│   ├── assets/                  # Static assets
│   │   └── Images/              # Image files
│   │
│   ├── App.jsx                  # Root component
│   └── main.jsx                 # Application entry point
│
├── server/                      # Development mock server
│   ├── mock-server.cjs          # Express mock API
│   └── utils/                   # Server utilities
│
├── public/                      # Public static files
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── vercel.json                  # Vercel deployment config
├── package.json                 # Dependencies and scripts
└── vite.config.js              # Vite configuration
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Mock Server (Development Only)
node server/mock-server.cjs    # Start mock API server (port 5000)
```

## 🔌 API Integration

### Backend Repository
- **URL:** [MSIS207.Q14_Backend](https://github.com/MinhQuanUIT/MSIS207.Q14_Backend)
- **Production:** https://msis207-q14-backend.onrender.com

### API Endpoints

#### Authentication
```
POST   /api/auth/register       # User registration
POST   /api/auth/login          # User login
GET    /api/auth/profile        # Get user profile
```

#### Books
```
GET    /api/books               # List books (pagination, search, filter)
GET    /api/books/:id           # Get book details
POST   /api/books/:id/reviews   # Add book review
```

#### Cart
```
GET    /api/cart                # Get user cart
POST   /api/cart                # Add item to cart
PUT    /api/cart/:bookId        # Update cart item quantity
DELETE /api/cart/:bookId        # Remove item from cart
DELETE /api/cart/clear          # Clear entire cart
```

#### Orders
```
POST   /api/orders              # Create order
GET    /api/orders/my-orders    # Get user orders
GET    /api/orders/:id          # Get order details
PUT    /api/orders/:id/cancel   # Cancel order
```

#### Admin (Protected)
```
GET    /api/users               # List all users
GET    /api/orders/all          # List all orders
PUT    /api/orders/:id/status   # Update order status
POST   /api/books               # Create book
PUT    /api/books/:id           # Update book
DELETE /api/books/:id           # Delete book
```

## 🎨 Design System

### Color Palette
```css
--primary-color: #1890ff      /* Primary Blue */
--accent-color: #ff424e       /* Action Red */
--success-color: #52c41a      /* Success Green */
--warning-color: #faad14      /* Warning Orange */
--error-color: #f5222d        /* Error Red */
--bg-color: #f5f5f5          /* Background Gray */
--text-primary: #242424       /* Primary Text */
--text-secondary: #666666     /* Secondary Text */
```

### Breakpoints
```css
/* Mobile First Approach */
--mobile: 0px - 767px
--tablet: 768px - 1023px
--desktop: 1024px+
```

### Typography
- **Headings:** System UI, -apple-system, BlinkMacSystemFont
- **Body:** Segoe UI, Roboto, Helvetica Neue, Arial

## 🚢 Deployment

### Deploy to Vercel

1. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select `MSIS207.Q14_Frontend` repository

3. **Configure build settings**
   - Framework Preset: **Vite**
   - Root Directory: **Bookshop_FE**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set environment variables**
```env
VITE_API_BASE_URL=https://msis207-q14-backend.onrender.com/api
VITE_USE_MOCK_DATA=false
VITE_APP_NAME=TiQiShop Bookstore
```

5. **Deploy**
   - Click "Deploy" button
   - Wait for build to complete (~2-3 minutes)

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests

## 🧪 Testing

### Manual Testing Checklist

**Authentication Flow:**
- [ ] User registration with validation
- [ ] User login with JWT token
- [ ] Logout and token clearing
- [ ] Protected route access

**Shopping Flow:**
- [ ] Browse books with search and filter
- [ ] View product details
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Proceed to checkout
- [ ] Complete order placement

**Order Management:**
- [ ] View order history
- [ ] Check order details
- [ ] Cancel pending orders

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://msis207-q14-backend.onrender.com/api` |
| `VITE_USE_MOCK_DATA` | Use mock data instead of API | `false` |
| `VITE_APP_NAME` | Application name | `TiQiShop Bookstore` |

## 🐛 Known Issues & Solutions

### Issue 1: Authentication not persisting
**Solution:** Fixed by dispatching Redux `loginAction` after successful login/register

### Issue 2: Checkout fails with 500 error
**Solution:** Fixed field mapping - Backend expects `qty` not `quantity`, and unified address format

### Issue 3: Cart not updating after login
**Solution:** Implemented cart synchronization between localStorage and Redux

## 🤝 Contributing

This is a private educational project. For questions or collaboration:
- Contact: MinhQuanUIT
- Repository: [MSIS207.Q14_Frontend](https://github.com/MinhQuanUIT/MSIS207.Q14_Frontend)

## 📄 License

Private project - All rights reserved © 2025 TiQi Bookstore

---

**Course:** MSIS207 - Information System Development  
**Institution:** University of Information Technology - VNU-HCM  
**Academic Year:** 2024-2025
