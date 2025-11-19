import React from 'react'
import { Typography } from 'antd'
import SliderComponent from '../components/SliderComponent/SliderComponent'

const { Title, Paragraph } = Typography

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Home</Title>
      <SliderComponent />
      <Paragraph>Welcome to TiQiShop — browse categories using the search above.</Paragraph>
    </div>
  )
}
  