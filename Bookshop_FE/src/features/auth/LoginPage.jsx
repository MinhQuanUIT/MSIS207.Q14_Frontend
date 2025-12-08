import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import loginImage from '../../assets/Images/loginImange.png'
import './LoginPage.css'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const response = await authService.login(values)
      const { token, role } = response.data
      
      if (!token) {
        throw new Error('Không nhận được token')
      }
      
      // Token and role are already saved in authService.login()
      message.success('Đăng nhập thành công!')
      
      // Navigate based on role
      if (role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = error.response?.data?.msg || error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Login form */}
        <div className="login-left">
          <button className="back-button" onClick={() => navigate('/')}>
            ←
          </button>

          <h1 className="login-title">Đăng nhập bằng email</h1>
          <p className="login-subtitle">Nhập email và mật khẩu tài khoản Tiqi</p>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <input
                type="email"
                placeholder="abc@email.com"
                className="login-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  className="login-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </Form.Item>

            <div className="login-footer">
              <Link to="/forgot-password" className="forgot-link">Quên mật khẩu?</Link>
              <div className="register-link">
                Chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link>
              </div>
            </div>
          </Form>
        </div>

        {/* Right side - Illustration */}
        <div className="login-right">
          <div className="illustration">
            <div className="illustration-image">
              <img 
                src={loginImage}
                alt="Login illustration"
                style={{ width: '100%', maxWidth: '400px' }}
              />
            </div>
            <h3 className="promo-title">Mua sắm tại Tiqi</h3>
            <p className="promo-subtitle">Siêu ưu đãi mỗi ngày</p>
          </div>
        </div>
      </div>
    </div>
  )
}
