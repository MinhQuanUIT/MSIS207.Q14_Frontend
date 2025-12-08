import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Typography, Button, InputNumber, Spin, message, Breadcrumb, Divider, Rate } from 'antd'
import { ShoppingCartOutlined, StarFilled, HomeOutlined } from '@ant-design/icons'
import { bookService } from '../../services/book.service'
import { cartService } from '../../services/cart.service'
import { formatPrice, calculateDiscount } from '../../utils/formatPrice'
import './BookDetailPage.css'

const { Title, Text, Paragraph } = Typography

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadBook()
  }, [id])

  const loadBook = async () => {
    try {
      setLoading(true)
      console.log('Loading book with ID:', id)
      const response = await bookService.getById(id)
      console.log('API Response:', response.data)
      // Handle both response.data.data (from mock) and response.data (direct)
      const bookData = response.data.data || response.data
      console.log('Book data:', bookData)
      setBook(bookData)
    } catch (error) {
      message.error('Không thể tải thông tin sách')
      console.error('Error loading book:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      message.warning('Vui lòng đăng nhập để thêm vào giỏ hàng')
      navigate('/login')
      return
    }

    try {
      await cartService.addItem(id, quantity)
      message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`)
    } catch (error) {
      message.error('Không thể thêm vào giỏ hàng')
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    )
  }

  if (!book) {
    return <div>Không tìm thấy sách</div>
  }

  return (
    <div className="book-detail-page">
      <div className="container">
        <Breadcrumb
          style={{ marginBottom: 24 }}
          items={[
            { href: '/', title: <HomeOutlined /> },
            { href: '/books', title: 'Sách' },
            { title: book.title }
          ]}
        />

        <Row gutter={32}>
          <Col xs={24} md={10}>
            <div className="book-image-wrapper">
              <img src={book.image} alt={book.title} className="book-image" />
              {book.stock !== undefined && (
                <div className="stock-info">
                  {book.stock > 0 ? (
                    <Text type="success">✓ Còn hàng ({book.stock} sản phẩm)</Text>
                  ) : (
                    <Text type="danger">✗ Hết hàng</Text>
                  )}
                </div>
              )}
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div className="book-info">
              <Title level={2}>{book.title}</Title>
              <Text className="book-author">Tác giả: <strong>{book.author}</strong></Text>
              {book.category && (
                <Text className="book-category">Danh mục: {book.category}</Text>
              )}

              {book.rating && (
                <div className="book-rating">
                  <Rate disabled defaultValue={parseFloat(book.rating)} style={{ fontSize: 16 }} />
                  <Text strong style={{ marginLeft: 8 }}>{book.rating}</Text>
                  {book.sold && <Text type="secondary"> | Đã bán {book.sold.toLocaleString()}</Text>}
                </div>
              )}

              <Divider />

              <div className="book-price-section">
                <div className="price-main">
                  {typeof book.price === 'number' ? formatPrice(book.price) : book.price}
                </div>
                {book.oldPrice && (
                  <>
                    <div className="price-old">
                      {typeof book.oldPrice === 'number' ? formatPrice(book.oldPrice) : book.oldPrice}
                    </div>
                    {typeof book.price === 'number' && typeof book.oldPrice === 'number' && (
                      <div className="discount-badge">
                        -{calculateDiscount(book.oldPrice, book.price)}%
                      </div>
                    )}
                  </>
                )}
              </div>

              {book.badges && book.badges.length > 0 && (
                <div className="book-badges">
                  {book.badges.map((badge, i) => (
                    <span key={i} className="badge">{badge}</span>
                  ))}
                </div>
              )}

              <Divider />

              <div className="book-actions">
                <div style={{ marginBottom: 16 }}>
                  <Text strong style={{ marginRight: 16 }}>Số lượng:</Text>
                  <InputNumber
                    min={1}
                    max={book.stock || 99}
                    value={quantity}
                    onChange={setQuantity}
                    style={{ width: 120 }}
                  />
                </div>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={!book.stock || book.stock === 0}
                  block
                  style={{ maxWidth: 400 }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>

              <Divider />

              <div className="book-description-section">
                <Title level={4}>Mô tả sản phẩm</Title>
                <Paragraph className="book-description">
                  {book.description || 'Mô tả sản phẩm sẽ được cập nhật sau.'}
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
