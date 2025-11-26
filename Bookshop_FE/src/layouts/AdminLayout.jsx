import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  ShoppingOutlined,
  BarChartOutlined
} from '@ant-design/icons'
import './AdminLayout.css'

const { Header, Sider, Content } = Layout

export default function AdminLayout() {
  const location = useLocation()
  const selectedKey = location.pathname

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>
    },
    {
      key: '/admin/books',
      icon: <BookOutlined />,
      label: <Link to="/admin/books">Quản lý sách</Link>
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Quản lý người dùng</Link>
    },
    {
      key: '/admin/orders',
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/orders">Đơn hàng</Link>
    },
    {
      key: '/admin/reports',
      icon: <BarChartOutlined />,
      label: <Link to="/admin/reports">Báo cáo</Link>
    }
  ]

  return (
    <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
      <Sider collapsible theme="dark">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <div className="admin-header-content">
            <h3>TiQiShop Admin</h3>
            <Link to="/">← Về trang chủ</Link>
          </div>
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
