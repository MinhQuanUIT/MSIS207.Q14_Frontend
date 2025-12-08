import React, { useState } from 'react'
import { Form, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import loginImage from '../../assets/Images/loginImange.png'
import './RegisterPage.css'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const { confirmPassword, ...registerData } = values
      const response = await authService.register(registerData)
      const { token, role } = response.data
      
      if (!token) {
        throw new Error('Không nhận được token')
      }
      
      // Token and role are already saved in authService.register()
      message.success('Đăng ký thành công!')
      
      // Auto-login after successful registration and navigate
      if (role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = error.response?.data?.msg || error.response?.data?.message || 'Đăng ký thất bại. Email có thể đã được sử dụng.'
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left side - Register form */}
        <div className="register-left">
          <button className="back-button" onClick={() => navigate('/')}>
            ←
          </button>

          <h1 className="register-title">Đăng ký tài khoản</h1>
          <p className="register-subtitle">Tạo tài khoản để trải nghiệm mua sắm tốt nhất</p>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            className="register-form"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <input
                type="text"
                placeholder="Họ và tên"
                className="register-input"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <input
                type="email"
                placeholder="Email"
                className="register-input"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="register-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  className="register-input"
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

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'))
                  },
                }),
              ]}
            >
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu"
                  className="register-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </Form.Item>

            <div className="register-footer">
              <div className="login-link">
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </div>
            </div>
          </Form>
        </div>

        {/* Right side - Illustration */}
        <div className="register-right">
          <div className="illustration">
            <div className="illustration-image">
              <img 
                src={loginImage}
                alt="Register illustration"
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
