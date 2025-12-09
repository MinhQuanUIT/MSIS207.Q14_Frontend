import React, { useState } from 'react'
import { Rate, Button, Input, Form, message, Avatar } from 'antd'
import { LikeOutlined, DislikeOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { styles } from './styles'

const { TextArea } = Input

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

export default function CustomerReviews({ productRating = 4.8, totalReviews = 152, productId }) {
  const [filter, setFilter] = useState('all')
  const [reviews, setReviews] = useState(MOCK_REVIEWS)
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [form] = Form.useForm()

  // Calculate updated rating stats
  const calculateRatingStats = (reviewsList) => {
    const stats = [5, 4, 3, 2, 1].map(stars => {
      const count = reviewsList.filter(r => r.rating === stars).length
      const percentage = reviewsList.length > 0 ? Math.round((count / reviewsList.length) * 100) : 0
      return { stars, count, percentage }
    })
    return stats
  }

  const calculateAverageRating = (reviewsList) => {
    if (reviewsList.length === 0) return 0
    const sum = reviewsList.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviewsList.length).toFixed(1)
  }

  const ratingStats = calculateRatingStats(reviews)
  const avgRating = calculateAverageRating(reviews)

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      message.warning('Vui lòng đăng nhập để đánh giá sản phẩm')
      return
    }

    if (userRating === 0) {
      message.warning('Vui lòng chọn số sao đánh giá')
      return
    }

    if (!reviewText.trim()) {
      message.warning('Vui lòng nhập nội dung đánh giá')
      return
    }

    // Create new review
    const newReview = {
      id: reviews.length + 1,
      userName: user?.name || user?.email?.split('@')[0] || 'Người dùng',
      rating: userRating,
      date: new Date().toLocaleDateString('vi-VN'),
      content: reviewText,
      positives: [],
      negatives: [],
      images: []
    }

    setReviews([newReview, ...reviews])
    message.success('Đánh giá của bạn đã được gửi thành công!')

    // Reset form
    setUserRating(0)
    setReviewText('')
    form.resetFields()
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Khách hàng đánh giá</h2>
      
      <div style={styles.mainContent}>
        {/* Left: Overall Rating */}
        <div style={styles.leftSection}>
          <div style={styles.overallTitle}>Tổng quan</div>
          <div style={styles.ratingScore}>{avgRating}</div>
          <div style={styles.ratingStars}>
            <Rate disabled value={parseFloat(avgRating)} style={{ fontSize: 24, color: '#ffc400' }} />
          </div>
          <div style={styles.ratingCount}>({reviews.length} đánh giá)</div>

          {/* Rating Bars */}
          {ratingStats.map((stat) => (
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
          {/* Review Form */}
          <div style={styles.reviewForm}>
            <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 600 }}>Viết đánh giá của bạn</h3>
            <Form form={form} layout="vertical">
              <Form.Item label="Đánh giá của bạn">
                <Rate
                  value={userRating}
                  onChange={setUserRating}
                  style={{ fontSize: 32, color: '#ffc400' }}
                />
                <div style={{ marginTop: 8, color: '#666', fontSize: 14 }}>
                  {userRating === 0 && 'Chọn số sao'}
                  {userRating === 1 && 'Rất không hài lòng'}
                  {userRating === 2 && 'Không hài lòng'}
                  {userRating === 3 && 'Bình thường'}
                  {userRating === 4 && 'Hài lòng'}
                  {userRating === 5 && 'Rất hài lòng'}
                </div>
              </Form.Item>

              <Form.Item label="Nhận xét của bạn">
                <TextArea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleSubmitReview}
                  style={{ width: '100%', height: 40 }}
                >
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Reviews List */}
          <div style={styles.reviewList}>
            {reviews.map((review) => (
              <div key={review.id} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar icon={<UserOutlined />} size={40} style={{ backgroundColor: '#1890ff' }} />
                    <div>
                      <div style={styles.reviewerName}>{review.userName}</div>
                      <Rate disabled value={review.rating} style={{ fontSize: 14, color: '#ffc400' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>{review.date}</div>
                </div>

                {review.content && (
                  <div style={styles.reviewContent}>{review.content}</div>
                )}

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
