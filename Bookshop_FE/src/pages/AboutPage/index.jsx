import React from 'react'
import { Typography } from 'antd'
import { styles } from './styles'

const { Title, Paragraph } = Typography

export default function AboutPage() {
  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>About Us</Title>
      <Paragraph style={styles.content}>
        This is the about page. More content coming soon.
      </Paragraph>
    </div>
  )
}
