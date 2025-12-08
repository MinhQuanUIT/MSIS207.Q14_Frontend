import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { message } from 'antd'

/**
 * ProtectedRoute Component
 * Bảo vệ routes yêu cầu authentication hoặc admin role
 * 
 * @param {boolean} requireAuth - Yêu cầu user đã đăng nhập (default: true)
 * @param {boolean} requireAdmin - Yêu cầu user có role admin (default: false)
 * @param {ReactNode} children - Component con cần protect
 */
export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false 
}) {
  const location = useLocation()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // Check authentication
  if (requireAuth && !token) {
    message.warning('Vui lòng đăng nhập để tiếp tục')
    // Redirect to login, save current location to return after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check admin role
  if (requireAdmin && role !== 'admin') {
    message.error('Bạn không có quyền truy cập trang này')
    // Redirect to home if not admin
    return <Navigate to="/" replace />
  }

  // Allow access
  return children
}
