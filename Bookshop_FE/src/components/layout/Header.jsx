import React, { useState } from 'react'
import { Row, Col, Input, Button, Dropdown } from 'antd'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons'
import IconButton from './IconButton'
import TypeProduct from '../TypeProduct/TypeProduct'
import './Header.css'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')

  const userMenuItems = [
    { key: 'login', label: 'Đăng nhập' },
    { key: 'register', label: 'Đăng ký' },
    { key: 'account', label: 'Tài khoản' }
  ]

  return (
    <div className="header-root">
      <Row gutter={16} align="middle">
        {/* Logo / Shop Name - col-6 */}
        <Col span={6}>
          <div className="header-logo">TiQiShop</div>
        </Col>

        {/* Search Bar + Button - col-12 */}
        <Col span={12}>
          <div className="search-with-button">
            <Input
              className="header-search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <IconButton className="search-button" type="primary" icon={<SearchOutlined />} onClick={() => console.log('search', searchValue)}>
              Search
            </IconButton>
          </div>
          <TypeProduct />
        </Col>

        {/* Action Buttons - col-6 */}
        <Col span={6} className="header-actions">
          <Button className="cart-btn" type="text" icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}>Giỏ hàng</Button>

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
