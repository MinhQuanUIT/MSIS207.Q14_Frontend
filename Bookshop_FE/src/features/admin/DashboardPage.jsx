import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Statistic, Typography } from 'antd'
import { BookOutlined, UserOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons'
import api from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import './AdminPages.css'

const { Title } = Typography

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      
      // Load books count
      const booksRes = await api.get('/books?limit=1')
      const totalBooks = booksRes.data.total || 0

      // Load users count
      const usersRes = await api.get('/users')
      const totalUsers = usersRes.data.count || 0

      // Load orders and calculate revenue
      const ordersRes = await api.get('/orders/all')
      const orders = ordersRes.data.orders || []
      const totalOrders = orders.length
      const totalRevenue = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.totalPrice, 0)

      setStats({
        totalBooks,
        totalUsers,
        totalOrders,
        totalRevenue
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Tổng số sách"
              value={stats.totalBooks}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Người dùng"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Đơn hàng"
              value={stats.totalOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Doanh thu"
              value={stats.totalRevenue}
              formatter={(value) => formatPrice(value)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
