import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag, Button, message, Select } from 'antd'
import api from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

const { Title } = Typography

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const response = await api.get('/orders/all')
      setOrders(response.data.orders || [])
    } catch (error) {
      console.error('Error loading orders:', error)
      message.error('Không thể tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus })
      message.success('Đã cập nhật trạng thái đơn hàng')
      loadOrders()
    } catch (error) {
      message.error('Không thể cập nhật trạng thái')
    }
  }

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: '_id',
      key: '_id',
      render: (id) => id.slice(-8)
    },
    {
      title: 'Khách hàng',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user?.name || 'N/A'
    },
    {
      title: 'Số lượng',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items?.length || 0
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => formatPrice(price)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 140 }}
          onChange={(value) => handleStatusChange(record._id, value)}
        >
          <Select.Option value="pending">
            <Tag color="orange">Chờ xử lý</Tag>
          </Select.Option>
          <Select.Option value="paid">
            <Tag color="blue">Đã thanh toán</Tag>
          </Select.Option>
          <Select.Option value="delivered">
            <Tag color="green">Đã giao</Tag>
          </Select.Option>
          <Select.Option value="cancelled">
            <Tag color="red">Đã hủy</Tag>
          </Select.Option>
        </Select>
      )
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString('vi-VN')
    },
  ]

  return (
    <div>
      <Title level={2}>Quản lý đơn hàng</Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '12px 24px' }}>
              <p><strong>Địa chỉ giao hàng:</strong></p>
              <p>{record.shippingInfo?.address}, {record.shippingInfo?.city}</p>
              <p><strong>Số điện thoại:</strong> {record.shippingInfo?.phone}</p>
              <p><strong>Sản phẩm:</strong></p>
              <ul>
                {record.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.book?.title} x {item.qty} - {formatPrice(item.price)}
                  </li>
                ))}
              </ul>
            </div>
          ),
        }}
      />
    </div>
  )
}
