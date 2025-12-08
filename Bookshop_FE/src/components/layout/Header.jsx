import React, { useState } from 'react'
import { Row, Col, Input, Button, Dropdown } from 'antd'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import IconButton from './IconButton'
import TypeProduct from '../TypeProduct/TypeProduct'
import './Header.css'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const userMenuItems = [
    { 
      key: 'login', 
      label: <Link to="/login">Đăng nhập</Link>
    },
    { 
      key: 'register', 
      label: <Link to="/register">Đăng ký</Link>
    },
    { 
      key: 'account', 
      label: <Link to="/account">Tài khoản</Link>
    }
  ]

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/books?search=${searchValue}`)
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
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
            />
            <IconButton className="search-button" type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              Tìm kiếm
            </IconButton>
          </div>
          <TypeProduct />
        </Col>

        {/* Action Buttons - col-6 */}
        <Col span={6} className="header-actions">
          <Link to="/cart">
            <Button className="cart-btn" type="text" icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}>Giỏ hàng</Button>
          </Link>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" className="user-btn" icon={<UserOutlined style={{ fontSize: 18 }} />}>
              <span className="user-text">Tài khoản</span> <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}
