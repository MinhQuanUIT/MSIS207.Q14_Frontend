import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Spin, message } from 'antd'
import { bookService } from '../../services/book.service'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import './BookListPage.css'

const { Title } = Typography

export default function BookListPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      const response = await bookService.getAll()
      // Handle response structure from mock server: { success: true, data: [...] }
      setBooks(response.data.data || response.data)
    } catch (error) {
      message.error('Không thể tải danh sách sách')
      console.error('Error loading books:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="book-list-page">
      <div style={{ padding: 20 }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={6} lg={6} style={{ maxWidth: 280 }}>
            <NavbarComponent />
          </Col>

          <Col xs={24} sm={24} md={18} lg={18}>
            <Title level={3}>Tất cả sách</Title>
            
            <Row gutter={[16, 16]} className="featured-grid">
              {books.map((book) => (
                <Col key={book._id} xs={24} sm={12} md={12} lg={6}>
                  <CardComponent
                    _id={book._id}
                    title={book.title}
                    author={book.author}
                    image={book.image}
                    price={book.price}
                    oldPrice={book.oldPrice}
                    rating={book.rating}
                    sold={book.sold}
                    badges={book.badges}
                    promos={book.promos}
                    shipping={book.shipping}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
