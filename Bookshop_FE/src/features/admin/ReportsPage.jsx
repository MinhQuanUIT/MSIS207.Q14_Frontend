import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Statistic, Typography } from 'antd'
import { BookOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons'
import api from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

const { Title } = Typography

export default function ReportsPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      // Load books
      const booksRes = await api.get('/books?limit=1')
      const totalBooks = booksRes.data.total || 0

      // Load orders
      const ordersRes = await api.get('/orders/all')
      const orders = ordersRes.data.orders || []
      const totalOrders = orders.length
      const pendingOrders = orders.filter(o => o.status === 'pending').length
      const totalRevenue = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.totalPrice, 0)

      setStats({
        totalBooks,
        totalOrders,
        totalRevenue,
        pendingOrders
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Title level={2}>Báo cáo</Title>
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
              title="Tổng đơn hàng"
              value={stats.totalOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Đơn chờ xử lý"
              value={stats.pendingOrders}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#faad14' }}
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
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
