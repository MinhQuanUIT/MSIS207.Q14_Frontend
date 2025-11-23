import React from 'react'
import { Typography, Row, Col } from 'antd'
import SliderComponent from '../components/SliderComponent/SliderComponent'
import CardComponent from '../components/CardComponent/CardComponent'
import NavbarComponent from '../components/NavbarComponent/NavbarComponent'

import img1 from '../assets/Images/2d09d0f1742dd78bdcc8eccff1702c50.png'
import img2 from '../assets/Images/6839e1b6bf732b12f8dd0ee56dc93e7d.png'
import img3 from '../assets/Images/d5a5bf8ea34feb00afa2ef43721be88d.jpg.webp'
import img4 from '../assets/Images/f57b2ab6a239549336f847f993de6b1f.jpg.webp'

const { Title, Paragraph } = Typography

const products = [
  {
    title: 'Sách Tâm Lý Học Về Tiền',
    author: 'MORGAN HOUSEL',
    desc: 'Sách kinh tế nổi bật',
    image: img1,
    price: '105.280đ',
    oldPrice: '165.000đ',
    rating: 4.9,
    sold: 27795,
    badges: ['TOP DEAL', 'CHÍNH HÃNG'],
    promos: ['Mua 3 giảm 5%', 'Giảm 5%'],
    shipping: 'Giao siêu tốc 2h'
  },
  {
    title: 'Sách Deep Work - Làm Ra Làm, Chơi Ra Chơi (Tái Bản)',
    author: 'CAL NEWPORT',
    desc: 'Sách phát triển năng lực tập trung',
    image: img2,
    price: '98.320đ',
    oldPrice: '159.000đ',
    rating: 4.8,
    sold: 3807,
    badges: ['CHÍNH HÃNG'],
    promos: ['Mua 3 giảm 5%', 'Giảm 5%'],
    shipping: 'Giao siêu tốc 2h'
  },
  {
    title: 'Sách Kỹ Năng A',
    author: 'Tác giả A',
    desc: 'Kỹ năng & phát triển bản thân',
    image: img3,
    price: '120.000đ',
    oldPrice: '',
    rating: 4.7,
    sold: 1240,
    badges: [],
    promos: ['Giảm 5%'],
    shipping: ''
  },
  {
    title: 'Sách Kỹ Năng B',
    author: 'Tác giả B',
    desc: 'Sách thực hành',
    image: img4,
    price: '89.000đ',
    oldPrice: '129.000đ',
    rating: 4.6,
    sold: 540,
    badges: [],
    promos: [],
    shipping: ''
  }
]

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Home</Title>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6} style={{ maxWidth: 280 }}>
          <NavbarComponent />
        </Col>

        <Col xs={24} sm={24} md={18} lg={18}>
          <SliderComponent />

          <Paragraph style={{ marginTop: 16 }}>Welcome to TiQiShop — browse categories using the search above.</Paragraph>

          <div className="featured-grid" style={{ marginTop: 24 }}>
            <Title level={4}>Featured</Title>
            <Row gutter={[16, 16]}>
              {products.map((p, idx) => (
                <Col key={idx} xs={24} sm={12} md={12} lg={6}>
                  <CardComponent
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
          </div>
        </Col>
      </Row>
    </div>
  )
}
  