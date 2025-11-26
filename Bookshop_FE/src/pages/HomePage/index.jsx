import React, { useState } from 'react'
import { Typography, Row, Col, Button } from 'antd'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { styles, gridConfig } from './styles'

const { Title, Paragraph } = Typography

// Mock data - will be replaced with API call from backend
const generateMockProducts = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `product-${i}`,
    title: `Sách mẫu ${i + 1}`,
    author: `Tác giả ${i + 1}`,
    desc: `Mô tả sản phẩm ${i + 1}`,
    image: 'https://via.placeholder.com/240x220/f0f0f0/666?text=Product+Image',
    price: `${(Math.random() * 200000 + 50000).toFixed(0)}đ`,
    oldPrice: Math.random() > 0.5 ? `${(Math.random() * 300000 + 100000).toFixed(0)}đ` : '',
    rating: (Math.random() * 1 + 4).toFixed(1),
    sold: Math.floor(Math.random() * 10000),
    badges: Math.random() > 0.5 ? ['CHÍNH HÃNG'] : [],
    promos: Math.random() > 0.5 ? ['Giảm 5%'] : [],
    shipping: Math.random() > 0.6 ? 'Giao siêu tốc 2h' : ''
  }))
}

const allProducts = generateMockProducts(24) // Generate 24 mock products for demo

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(16) // Show at least 4 rows (16 products)

  const showMore = () => setVisibleCount((c) => Math.min(c + 4, allProducts.length))

  return (
    <div style={styles.container}>
      <Title level={3} style={styles.pageTitle}>Home</Title>

      <Row gutter={gridConfig.gutter}>
        <Col {...gridConfig.sidebarSpan} style={styles.sidebarCol}>
          <NavbarComponent />
        </Col>

        <Col {...gridConfig.contentSpan}>
          <SliderComponent />

          <div style={styles.featuredSection}>
            <Title level={4} style={styles.sectionTitle}>Featured Products</Title>
            <Row gutter={gridConfig.gutter}>
              {allProducts.slice(0, visibleCount).map((p) => (
                <Col key={p._id} {...gridConfig.cardSpan}>
                  <CardComponent
                    _id={p._id}
                    title={p.title}
                    author={p.author}
                    description={p.desc}
                    image={p.image}
                    price={p.price}
                    oldPrice={p.oldPrice}
                    rating={p.rating}
                    sold={p.sold}
                    badges={p.badges}
                    promos={p.promos}
                    shipping={p.shipping}
                  />
                </Col>
              ))}
            </Row>

            {visibleCount < allProducts.length && (
              <div style={styles.loadMoreContainer}>
                <Button 
                  onClick={showMore} 
                  type="default" 
                  shape="round"
                  style={styles.loadMoreButton}
                >
                  Xem Thêm
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
