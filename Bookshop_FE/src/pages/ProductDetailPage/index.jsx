import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Divider, Tabs, message } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import ProductImages from '../../components/ProductDetail/ProductImages'
import ProductInfo from '../../components/ProductDetail/ProductInfo'
import ProductSpecs from '../../components/ProductDetail/ProductSpecs'
import PurchasePanel from '../../components/ProductDetail/PurchasePanel'
import SimilarProducts from '../../components/ProductDetail/SimilarProducts'
import CustomerReviews from '../../components/ProductDetail/CustomerReviews'
import { styles } from './styles'

const { TabPane } = Tabs

const MOCK_PRODUCT = {
  id: 'mock-book-1',
  title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  author: 'Robert C. Martin',
  category: 'Lập trình',
  rating: 4.7,
  sold: 12345,
  price: 250000,
  oldPrice: 320000,
  badges: ['Bìa mềm', 'Tặng Bookmark'],
  stock: 25,
  images: [
    '/images/mock/clean-code-1.jpg',
    '/images/mock/clean-code-2.jpg',
    '/images/mock/clean-code-3.jpg'
  ],
  isbn: '0132350882',
  pages: 464,
  publisher: 'Prentice Hall',
  description: '<p>Clean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code.</p>'
}

export default function ProductDetailPage() {
  const { id } = useParams()
  // UI-only: show mock product. If you want different mock per id, add logic.
  const [product] = useState(MOCK_PRODUCT)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleAddToCart = (qty = 1) => {
    message.success(`Đã thêm ${qty} sản phẩm (mock) vào giỏ hàng`)
  }

  const handleBuyNow = (qty = 1) => {
    message.info(`Mua ngay ${qty} sản phẩm (mock) — chuyển tới thanh toán giả lập`)
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.breadcrumbSection}>
        <Breadcrumb
          items={[
            { href: '/', title: <HomeOutlined /> },
            { href: '/books', title: product.category },
            { title: product.title }
          ]}
        />
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <div style={styles.imageSection}>
            <ProductImages
              images={product.images}
              selected={selectedImage}
              onSelect={setSelectedImage}
            />
          </div>
        </div>

        <div style={styles.middleColumn}>
          <div style={styles.infoSection}>
            <ProductInfo product={product} />
          </div>

          <div style={styles.descriptionSection}>
            <Tabs defaultActiveKey="description">
              <TabPane tab="Mô tả sản phẩm" key="description">
                <div style={styles.descriptionContent}>
                  <p><strong>Tác giả:</strong> {product.author}</p>
                  <p><strong>Danh mục:</strong> {product.category}</p>
                  <Divider />
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              </TabPane>
              <TabPane tab="Thông số kỹ thuật" key="specs">
                <ProductSpecs product={product} />
              </TabPane>
            </Tabs>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.stickyWrapper}>
            <PurchasePanel
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            <div style={styles.sellerCard}>
              <div style={styles.sellerHeader}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: '#1890ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Nhà
                </div>
                <div>
                  <div style={styles.sellerName}>AHABOOKS</div>
                  <div style={{ fontSize: 12, color: '#52c41a' }}>Đã xác thực</div>
                </div>
              </div>
              <div style={styles.sellerStats}>
                <div style={styles.statRow}><span style={styles.statLabel}>Đánh giá</span><span style={styles.statValue}>4.8</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}>Sản phẩm</span><span style={styles.statValue}>5.000+</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}>Tỉ lệ phản hồi</span><span style={styles.statValue}>98%</span></div>
              </div>
            </div>

            <div style={styles.deliveryCard}>
              <div style={styles.sectionLabel}>Thông tin vận chuyển</div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={styles.deliveryOption}><div style={styles.deliveryTitle}>Giao Thứ Bảy</div><div style={styles.deliveryDesc}>Dự kiến giao trước 19h</div></div>
              <div style={styles.deliveryOption}><div style={styles.deliveryTitle}>Đổi trả 30 ngày</div><div style={styles.deliveryDesc}>Hỗ trợ đổi trả</div></div>
              <div style={styles.deliveryOption}><div style={styles.deliveryTitle}>100% chính hãng</div><div style={styles.deliveryDesc}>Cam kết từ nhà bán</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <SimilarProducts category={product.category} />

      {/* Customer Reviews Section */}
      <CustomerReviews productRating={product.rating} totalReviews={152} />
    </div>
  )
}
