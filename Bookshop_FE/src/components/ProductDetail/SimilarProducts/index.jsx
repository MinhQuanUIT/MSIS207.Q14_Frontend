import React, { useState, useEffect } from 'react'
import { Rate, Spin } from 'antd'
import { styles } from './styles'
import { formatPrice } from '../../../utils/formatPrice'
import { bookService } from '../../../services/book.service'

export default function SimilarProducts({ currentBookId, author, category }) {
  const [similarBooks, setSimilarBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSimilarBooks()
  }, [currentBookId, author])

  const loadSimilarBooks = async () => {
    try {
      setLoading(true)
      let books = []

      // First, try to get books by same author
      if (author) {
        const authorResponse = await bookService.getAll({ 
          search: author, 
          limit: 10 
        })
        const authorBooks = (authorResponse.data.data || authorResponse.data || [])
          .filter(book => book._id !== currentBookId) // Exclude current book
        books = [...authorBooks]
      }

      // If not enough books, add books from same category
      if (books.length < 5 && category) {
        const categoryResponse = await bookService.getAll({ 
          search: category, 
          limit: 10 
        })
        const categoryBooks = (categoryResponse.data.data || categoryResponse.data || [])
          .filter(book => 
            book._id !== currentBookId && 
            !books.find(b => b._id === book._id)
          )
        books = [...books, ...categoryBooks]
      }

      // If still not enough, get random books
      if (books.length < 5) {
        const randomResponse = await bookService.getAll({ limit: 10 })
        const randomBooks = (randomResponse.data.data || randomResponse.data || [])
          .filter(book => 
            book._id !== currentBookId && 
            !books.find(b => b._id === book._id)
          )
        books = [...books, ...randomBooks]
      }

      // Take only first 5 books
      setSimilarBooks(books.slice(0, 5))
    } catch (error) {
      console.error('Error loading similar books:', error)
      setSimilarBooks([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ ...styles.container, textAlign: 'center', padding: '40px 0' }}>
        <Spin size="large" />
        <p>Đang tải sản phẩm tương tự...</p>
      </div>
    )
  }

  if (similarBooks.length === 0) {
    return null // Don't show section if no similar books
  }
  const calculateDiscount = (oldPrice, newPrice) => {
    if (!oldPrice) return 0
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sản phẩm tương tự</h2>
      
      <div style={styles.productGrid}>
        {similarBooks.map((book) => {
          const discount = book.oldPrice ? calculateDiscount(book.oldPrice, book.price) : 0
          
          return (
            <a 
              key={book._id} 
              href={`/books/${book._id}`}
              style={styles.productCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src={book.image || 'https://placehold.co/160x200?text=Book'} 
                  alt={book.title}
                  style={styles.productImage}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/160x200?text=Book'
                  }}
                />
                {discount > 0 && <span style={styles.discount}>-{discount}%</span>}
                {book.inStock === false && <span style={{ ...styles.adBadge, background: '#ff4d4f' }}>Hết hàng</span>}
              </div>
              
              <div style={styles.productTitle}>{book.title}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Tác giả: {book.author}</div>
              
              <div style={styles.ratingRow}>
                <Rate disabled value={book.averageRating || 0} style={{ fontSize: 12 }} />
                <span style={{ fontSize: 11, color: '#999', marginLeft: 8 }}>Đã bán {book.sales || 0}</span>
              </div>
              
              <div style={styles.priceRow}>
                <span style={styles.price}>{formatPrice(book.price)}</span>
                {book.oldPrice && (
                  <span style={styles.oldPrice}>{formatPrice(book.oldPrice)}</span>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
