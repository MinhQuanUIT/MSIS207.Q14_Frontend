import React, { useEffect, useState } from 'react'
import { Table, Button, InputNumber, Typography, message, Empty } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { cartService } from '../../services/cart.service'
import './CartPage.css'

const { Title, Text } = Typography

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      message.warning('Vui lòng đăng nhập để xem giỏ hàng')
      navigate('/login')
      return
    }
    loadCart()
  }, [navigate])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      setCartItems(response.data.items || [])
    } catch (error) {
      message.error('Không thể tải giỏ hàng')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await cartService.updateItem(itemId, quantity)
      loadCart()
    } catch (error) {
      message.error('Không thể cập nhật số lượng')
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await cartService.removeItem(itemId)
      message.success('Đã xóa sản phẩm khỏi giỏ hàng')
      loadCart()
    } catch (error) {
      message.error('Không thể xóa sản phẩm')
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''))
      return sum + (price * item.quantity)
    }, 0)
  }

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'book',
      key: 'book',
      render: (book) => (
        <div className="cart-product">
          <img src={book.image} alt={book.title} />
          <div>
            <div>{book.title}</div>
            <Text type="secondary">{book.author}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={99}
          value={quantity}
          onChange={(value) => handleUpdateQuantity(record._id, value)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'subtotal',
      render: (_, record) => {
        const price = parseFloat(record.price.replace(/[^\d]/g, ''))
        return `${(price * record.quantity).toLocaleString('vi-VN')}đ`
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record._id)}
        />
      ),
    },
  ]

  return (
    <div className="cart-page">
      <div className="container">
        <Title level={2}>Giỏ hàng</Title>

        {cartItems.length === 0 ? (
          <Empty description="Giỏ hàng trống" />
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={cartItems}
              rowKey="_id"
              loading={loading}
              pagination={false}
            />

            <div className="cart-summary">
              <div className="cart-total">
                <Text strong style={{ fontSize: 18 }}>Tổng cộng:</Text>
                <Text strong style={{ fontSize: 24, color: '#ff4d4f' }}>
                  {calculateTotal().toLocaleString('vi-VN')}đ
                </Text>
              </div>
              <Button type="primary" size="large" style={{ marginTop: 16 }}>
                Thanh toán
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
