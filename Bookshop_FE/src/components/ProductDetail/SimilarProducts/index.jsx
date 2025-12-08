import React from 'react'
import { Rate } from 'antd'
import { styles } from './styles'
import { formatPrice } from '../../../utils/formatPrice'

// Mock data sản phẩm tương tự
const SIMILAR_PRODUCTS = [
  {
    id: 'book-2',
    title: 'Sách Tâm Lý Học Về Tiền',
    image: '/images/mock/book-2.jpg',
    price: 90516,
    oldPrice: 120000,
    rating: 5,
    isAd: true
  },
  {
    id: 'book-3',
    title: 'Sách Kiếm Soát Tài Chính: Quản Lý Chi Tiêu Thông Minh',
    image: '/images/mock/book-3.jpg',
    price: 120384,
    oldPrice: null,
    rating: 5,
    isAd: false
  },
  {
    id: 'book-4',
    title: 'Sách Năng Lượng Của Tiền',
    image: '/images/mock/book-4.jpg',
    price: 128136,
    oldPrice: null,
    rating: 4.5,
    isAd: true
  },
  {
    id: 'book-5',
    title: 'Hiểu Đúng Về Tiền',
    image: '/images/mock/book-5.jpg',
    price: 42240,
    oldPrice: null,
    rating: 5,
    isAd: false
  },
  {
    id: 'book-6',
    title: 'Sách Tiền Tệ Và Chuyển Làm Giàu',
    image: '/images/mock/book-6.jpg',
    price: 86400,
    oldPrice: null,
    rating: 4,
    isAd: false
  },
  {
    id: 'book-7',
    title: 'Sách Kỹ năng lập kế hoạch và quản lý thời gian',
    image: '/images/mock/book-7.jpg',
    price: 84132,
    oldPrice: null,
    rating: 4,
    isAd: true
  },
  {
    id: 'book-8',
    title: 'Sách Thiêu Tiền',
    image: '/images/mock/book-8.jpg',
    price: 105840,
    oldPrice: null,
    rating: 5,
    isAd: false
  },
  {
    id: 'book-9',
    title: 'Sách Kế Hoạch Quản Lý Tài Chính Cá Nhân',
    image: '/images/mock/book-9.jpg',
    price: 100548,
    oldPrice: null,
    rating: 5,
    isAd: false
  }
]

export default function SimilarProducts({ category }) {
  const calculateDiscount = (oldPrice, newPrice) => {
    if (!oldPrice) return 0
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sản phẩm tương tự</h2>
      
      <div style={styles.productGrid}>
        {SIMILAR_PRODUCTS.slice(0, 5).map((product) => {
          const discount = calculateDiscount(product.oldPrice, product.price)
          
          return (
            <a 
              key={product.id} 
              href={`/books/${product.id}`}
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
                  src={product.image} 
                  alt={product.title}
                  style={styles.productImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/160x200?text=Book'
                  }}
                />
                {product.isAd && <span style={styles.adBadge}>AD</span>}
              </div>
              
              <div style={styles.productTitle}>{product.title}</div>
              
              <div style={styles.ratingRow}>
                <Rate disabled value={product.rating} style={{ fontSize: 12 }} />
              </div>
              
              <div style={styles.priceRow}>
                <span style={styles.price}>{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <>
                    <span style={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                    {discount > 0 && <span style={styles.discount}>-{discount}%</span>}
                  </>
                )}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
