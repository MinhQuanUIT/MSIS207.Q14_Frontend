import React from 'react'
import { Table, Button, InputNumber, Typography, message, Empty } from 'antd'
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity, selectCartItems } from '../../store/slices/cartSlice'
import { formatPrice } from '../../utils/formatPrice'
import './CartPage.css'

const { Title, Text } = Typography

export default function CartPage() {
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      message.warning('Số lượng phải lớn hơn 0')
      return
    }
    dispatch(updateQuantity({ itemId, quantity }))
    message.success('Đã cập nhật số lượng')
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId))
    message.success('Đã xóa sản phẩm khỏi giỏ hàng')
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^\d]/g, ''))
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
          <img src={book.image || 'https://placehold.co/80x100?text=Book'} alt={book.title} style={{ width: 80, height: 100, objectFit: 'cover' }} />
          <div style={{ marginLeft: 12 }}>
            <div style={{ fontWeight: 500 }}>{book.title}</div>
            <Text type="secondary">{book.author}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatPrice(typeof price === 'number' ? price : parseFloat(price.toString().replace(/[^\d]/g, '')))
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.book.stock || 99}
          value={quantity}
          onChange={(value) => handleUpdateQuantity(record._id, value)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record) => {
        const price = typeof record.price === 'number' ? record.price : parseFloat(record.price.toString().replace(/[^\d]/g, ''))
        return formatPrice(price * record.quantity)
      }
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
        >
          Xóa
        </Button>
      ),
    },
  ]

  return (
    <div className="cart-page">
      <Title level={2}>Giỏ hàng</Title>
      
      {cartItems.length === 0 ? (
        <Empty 
          image={<ShoppingOutlined style={{ fontSize: 64, color: '#ccc' }} />}
          description="Giỏ hàng trống"
        >
          <Button type="primary" onClick={() => navigate('/books')}>
            Tiếp tục mua sắm
          </Button>
        </Empty>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="_id"
            pagination={false}
          />
          
          <div className="cart-summary">
            <div className="summary-row">
              <Text strong>Tổng cộng:</Text>
              <Title level={3} style={{ color: '#ff4d4f', margin: 0 }}>
                {formatPrice(calculateTotal())}
              </Title>
            </div>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/checkout')}
              style={{ marginTop: 16 }}
            >
              Tiến hành thanh toán
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
