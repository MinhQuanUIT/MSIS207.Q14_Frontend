import React, { useState } from 'react'
import { Row, Col, Input, Button, Dropdown } from 'antd'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, DownOutlined, LogoutOutlined, CloseCircleFilled } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { selectTotalItems } from '../../store/slices/cartSlice'
import IconButton from './IconButton'
import './Header.css'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const cartItemsCount = useSelector(selectTotalItems)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  // Menu items based on authentication status
  const userMenuItems = isAuthenticated ? [
    { 
      key: 'account', 
      label: <Link to="/account">Tài khoản của tôi</Link>
    },
    ...(user?.role === 'admin' ? [{
      key: 'admin',
      label: <Link to="/admin">Quản trị</Link>
    }] : []),
    { 
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout
    }
  ] : [
    { 
      key: 'login', 
      label: <Link to="/login">Đăng nhập</Link>
    },
    { 
      key: 'register', 
      label: <Link to="/register">Đăng ký</Link>
    }
  ]

  const handleSearch = (e) => {
    if (e) e.preventDefault() // Prevent form submission reload
    if (searchValue.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchValue.trim())}`)
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  return (
    <div className="header-root">
      <Row gutter={16} align="middle">
        {/* Logo / Shop Name - col-6 */}
        <Col span={6}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="header-logo">TiQi</div>
          </Link>
        </Col>

        {/* Search Bar + Button - col-12 */}
        <Col span={12}>
          <div className="search-with-button">
            <Input
              className="header-search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={handleKeyPress}
              prefix={<SearchOutlined />}
              suffix={
                searchValue && (
                  <CloseCircleFilled 
                    onClick={handleClearSearch}
                    style={{ color: '#999', cursor: 'pointer', fontSize: 14 }}
                  />
                )
              }
              allowClear={false}
            />
            <IconButton 
              className="search-button" 
              type="primary" 
              icon={<SearchOutlined />} 
              onClick={handleSearch}
            >
              Tìm kiếm
            </IconButton>
          </div>
        </Col>

        {/* Action Buttons - col-6 */}
        <Col span={6} className="header-actions">
          <Link to="/cart">
            <Button className="cart-btn" type="text" icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}>
              Giỏ hàng
              {cartItemsCount > 0 && (
                <span className="cart-badge">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" className="user-btn" icon={<UserOutlined style={{ fontSize: 18 }} />}>
              <span className="user-text">
                {isAuthenticated && user?.name ? user.name : 'Tài khoản'}
              </span> 
              <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}
