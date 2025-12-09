import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Button, Spin, message } from 'antd'
import { useSearchParams } from 'react-router-dom'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { bookService } from '../../services/book.service'
import { styles, gridConfig } from './styles'

const { Title } = Typography

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const BOOKS_PER_PAGE = 16

  useEffect(() => {
    loadBooks()
  }, [currentPage, selectedCategory])

  // Sync category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam || '')
      setCurrentPage(1)
    }
  }, [searchParams.get('category')]) // Only depend on category param, not whole searchParams

  const loadBooks = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: BOOKS_PER_PAGE
      }

      // Add category filter if selected
      // Backend has Vietnamese category field: vanhoc, kyao, kinhdoanh, etc.
      if (selectedCategory) {
        // Map frontend category keys to backend Vietnamese categories
        const categoryMap = {
          'fiction': 'vanhoc',
          'fantasy': 'kyao',
          'scifi': 'khoahoc-vientuong',
          'mystery': 'trinhtham',
          'business': 'kinhdoanh',
          'technology': 'congnghe',
          'history': 'lichsu',
          'biography': 'tieusu',
          'psychology': 'tamly',
          'science': 'khoahoc-tunhien'
        }
        params.search = categoryMap[selectedCategory] || selectedCategory
      }

      const response = await bookService.getAll(params)
      const booksData = response.data.data || response.data
      
      // Append books if loading more, replace if new page/category
      if (currentPage === 1) {
        setBooks(booksData)
      } else {
        setBooks(prev => [...prev, ...booksData])
      }
      setTotalBooks(response.data.total || booksData.length)
    } catch (error) {
      console.error('Error loading books:', error)
      message.error('Không thể tải danh sách sách')
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey)
    setCurrentPage(1)
    setBooks([]) // Clear books to show loading state
    setSearchParams(categoryKey ? { category: categoryKey } : {})
  }

  const showMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const hasMoreBooks = books.length < totalBooks

  return (
    <div style={styles.container}>
      <Title level={3} style={styles.pageTitle}>Trang Chủ</Title>

      <Row gutter={gridConfig.gutter}>
        <Col {...gridConfig.sidebarSpan} style={styles.sidebarCol}>
          <NavbarComponent onCategorySelect={handleCategorySelect} />
        </Col>

        <Col {...gridConfig.contentSpan}>
          <SliderComponent />

          <div style={styles.featuredSection}>
            <Title level={4} style={styles.sectionTitle}>
              {selectedCategory ? 'Sách Theo Thể Loại' : 'Sách Nổi Bật'}
            </Title>
            
            {loading && currentPage === 1 ? (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" />
                <p>Đang tải sách...</p>
              </div>
            ) : (
              <>
                <Row gutter={gridConfig.gutter}>
                  {books.map((book) => (
                    <Col key={book._id} {...gridConfig.cardSpan}>
                      <CardComponent
                        _id={book._id}
                        title={book.title}
                        author={book.author}
                        description={book.description || 'Chưa có mô tả'}
                        image={book.image || 'https://placehold.co/240x320/e0e0e0/666?text=No+Image'}
                        price={book.price}
                        oldPrice={book.oldPrice}
                        rating={book.averageRating || 0}
                        sold={book.sales || 0}
                        badges={book.inStock ? ['Còn hàng'] : ['Hết hàng']}
                        promos={book.stock > 0 && book.stock < 10 ? ['Sắp hết'] : []}
                      />
                    </Col>
                  ))}
                </Row>

                {books.length === 0 && !loading && (
                  <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
                    <p>Không tìm thấy sách nào</p>
                  </div>
                )}

                {hasMoreBooks && (
                  <div style={styles.loadMoreContainer}>
                    <Button 
                      onClick={showMore} 
                      type="default" 
                      shape="round"
                      style={styles.loadMoreButton}
                      loading={loading && currentPage > 1}
                    >
                      Xem Thêm
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
