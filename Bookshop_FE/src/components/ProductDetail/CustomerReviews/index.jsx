import React, { useState } from 'react'
import { Rate } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { styles } from './styles'

// Mock data đánh giá
const MOCK_REVIEWS = [
  {
    id: 1,
    userName: 'Nguyễn Văn A',
    rating: 5,
    date: '19 tích cực, 1 tiêu cực',
    content: '',
    positives: [
      'Sách hay, bổ ích, dễ hiểu và dễ áp dụng.',
      'Sách dày dặn, mực in sắc nét, mới đẹp.',
      'Nội dung kinh điển, cập nhật, trực quan về tài chính cá nhân.'
    ],
    negatives: [
      'Lỗi viết dài dòng, khó nắm được nội dung.'
    ],
    images: []
  },
  {
    id: 2,
    userName: 'Trần Thị B',
    rating: 4,
    date: '10 tích cực, 0 tiêu cực',
    content: '',
    positives: [
      'Giao hàng nhanh, đóng gói cẩn thận.',
      'Dịch vụ hỗ trợ khách hàng tốt.',
      'Sản phẩm được giao đúng hẹn, nhân viên thân thiện.'
    ],
    negatives: [],
    images: []
  }
]

const RATING_STATS = [
  { stars: 5, count: 128, percentage: 84 },
  { stars: 4, count: 16, percentage: 11 },
  { stars: 3, count: 5, percentage: 3 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 0, percentage: 0 }
]

export default function CustomerReviews({ productRating = 4.8, totalReviews = 152 }) {
  const [filter, setFilter] = useState('all')

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Khách hàng đánh giá</h2>
      
      <div style={styles.mainContent}>
        {/* Left: Overall Rating */}
        <div style={styles.leftSection}>
          <div style={styles.overallTitle}>Tổng quan</div>
          <div style={styles.ratingScore}>{productRating}</div>
          <div style={styles.ratingStars}>
            <Rate disabled value={productRating} style={{ fontSize: 24, color: '#ffc400' }} />
          </div>
          <div style={styles.ratingCount}>({totalReviews} đánh giá)</div>

          {/* Rating Bars */}
          {RATING_STATS.map((stat) => (
            <div key={stat.stars} style={styles.ratingBar}>
              <div style={styles.barStars}>
                <Rate disabled value={stat.stars} style={{ fontSize: 12, color: '#ffc400' }} />
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${stat.percentage}%` }} />
              </div>
              <div style={styles.barCount}>{stat.count}</div>
            </div>
          ))}
        </div>

        {/* Right: Reviews List */}
        <div style={styles.rightSection}>
          <div style={styles.reviewList}>
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <div>
                    <div style={styles.reviewerName}>{review.userName}</div>
                    <Rate disabled value={review.rating} style={{ fontSize: 14, color: '#ffc400' }} />
                  </div>
                </div>

                <div style={styles.reviewDate}>Về sản phẩm: ({review.date})</div>

                {review.positives.length > 0 && (
                  <div style={styles.reviewFeatures}>
                    {review.positives.map((item, idx) => (
                      <div key={idx} style={styles.featureItem}>
                        <span>+</span> {item}
                      </div>
                    ))}
                  </div>
                )}

                {review.negatives.length > 0 && (
                  <div style={styles.reviewFeatures}>
                    {review.negatives.map((item, idx) => (
                      <div key={idx} style={{ ...styles.featureItem, ...styles.negativeItem }}>
                        <span>−</span> {item}
                      </div>
                    ))}
                  </div>
                )}

                {review.content && (
                  <div style={styles.reviewContent}>{review.content}</div>
                )}

                <div style={styles.reviewDate}>Về dịch vụ: ({review.date})</div>
                {review.positives.length > 0 && (
                  <div style={styles.reviewFeatures}>
                    {review.positives.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={styles.featureItem}>
                        <span>+</span> {item}
                      </div>
                    ))}
                  </div>
                )}

                <div style={styles.reviewActions}>
                  <button style={styles.actionButton}>
                    <LikeOutlined /> Hữu ích
                  </button>
                  <button style={styles.actionButton}>
                    <DislikeOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
