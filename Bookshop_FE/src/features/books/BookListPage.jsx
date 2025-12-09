import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Spin, message, Pagination, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { bookService } from '../../services/book.service'
import CardComponent from '../../components/CardComponent/CardComponent'
import FilterSidebar from '../../components/filters/FilterSidebar'
import './BookListPage.css'

const { Title } = Typography

export default function BookListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20)

  // Filter state - initialize from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || ''
  })

  // Sync filters with URL params
  useEffect(() => {
    const searchParam = searchParams.get('search') || ''
    const sortByParam = searchParams.get('sortBy') || ''
    
    if (searchParam !== filters.search || sortByParam !== filters.sortBy) {
      setFilters({
        search: searchParam,
        sortBy: sortByParam
      })
      setCurrentPage(1)
    }
  }, [searchParams])

  useEffect(() => {
    loadBooks()
  }, [filters, currentPage])

  const loadBooks = async () => {
    try {
      setLoading(true)
      
      // Build query params
      const params = {
        page: currentPage,
        limit: pageSize,
        ...(filters.search && { search: filters.search }),
        ...(filters.sortBy && { sortBy: filters.sortBy })
      }

      const response = await bookService.getAll(params)
      // Backend returns: {success: true, data: [...], total: 100, count: 20, page: 1, pages: 5}
      const data = response.data.data || response.data
      setBooks(Array.isArray(data) ? data : [])
      setTotal(response.data.total || response.data.count || data.length)
    } catch (error) {
      message.error('Không thể tải danh sách sách')
      console.error('Error loading books:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    
    // Update URL params
    const params = {}
    if (newFilters.search) params.search = newFilters.search
    if (newFilters.sortBy) params.sortBy = newFilters.sortBy
    setSearchParams(params)
  }

  const handleClearFilters = () => {
    setFilters({
      search: '',
      sortBy: ''
    })
    setCurrentPage(1)
    setSearchParams({}) // Clear URL params
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        <Row gutter={24}>
          {/* Filter Sidebar */}
          <Col xs={24} sm={24} md={6} lg={5}>
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </Col>

          {/* Book List */}
          <Col xs={24} sm={24} md={18} lg={19}>
            <Title level={3} style={{ marginBottom: 20 }}>
              Tất cả sách
              {total > 0 && <span style={{ fontSize: 14, color: '#666', marginLeft: 8 }}>({total} sản phẩm)</span>}
            </Title>
            
            {books.length === 0 ? (
              <Empty description="Không tìm thấy sách phù hợp" />
            ) : (
              <>
                <Row gutter={[16, 16]} className="featured-grid">
                  {books.map((book) => (
                    <Col key={book._id} xs={24} sm={12} md={12} lg={6}>
                      <CardComponent
                        _id={book._id}
                        title={book.title}
                        author={book.author}
                        image={book.image || 'https://placehold.co/240x320/e0e0e0/666?text=No+Image'}
                        price={book.price}
                        oldPrice={book.oldPrice}
                        rating={book.rating || book.averageRating || 0}
                        sold={book.sales || book.sold || 0}
                        badges={book.inStock ? ['Còn hàng'] : ['Hết hàng']}
                        promos={book.promos || []}
                        shipping={book.shipping || ''}
                      />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {total > pageSize && (
                  <div style={{ marginTop: 32, textAlign: 'center' }}>
                    <Pagination
                      current={currentPage}
                      total={total}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      showTotal={(total) => `Tổng ${total} sản phẩm`}
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
