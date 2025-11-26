import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="main-footer">
        <div className="footer-content">
          <p>&copy; 2025 TiQiShop - Bookstore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
