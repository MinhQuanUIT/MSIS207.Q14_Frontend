import React from 'react'
import { Button, Space, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store'

const { Title, Paragraph } = Typography

export default function Home() {
  const value = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Home</Title>
      <Paragraph>This is the home page. Counter example:</Paragraph>
      <Space>
        <Button type="primary" onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </Space>
      <div style={{ marginTop: 16 }}>Counter value: <strong>{value}</strong></div>
    </div>
  )
}
