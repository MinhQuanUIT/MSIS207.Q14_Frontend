import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'

// User pages
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProductDetailPage from '../pages/ProductDetailPage'

// Features
import BookListPage from '../features/books/BookListPage'
import BookDetailPage from '../features/books/BookDetailPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import CartPage from '../features/cart/CartPage'

// Admin features
import DashboardPage from '../features/admin/DashboardPage'
import BooksManagementPage from '../features/admin/BooksManagementPage'
import UsersManagementPage from '../features/admin/UsersManagementPage'
import OrdersManagementPage from '../features/admin/OrdersManagementPage'
import ReportsPage from '../features/admin/ReportsPage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* User Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Books */}
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id" element={<ProductDetailPage />} />
        
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<BooksManagementPage />} />
        <Route path="users" element={<UsersManagementPage />} />
        <Route path="orders" element={<OrdersManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  )
}
