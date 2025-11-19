import React from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function About(){
  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>About</Title>
      <Paragraph>This is a sample About page.</Paragraph>
    </div>
  )
}
