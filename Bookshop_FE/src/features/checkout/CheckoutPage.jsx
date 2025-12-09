import React, { useState } from 'react'
import { Form, Input, Radio, Card, Row, Col, Button, Typography, Divider, message, Steps } from 'antd'
import { ShoppingCartOutlined, EnvironmentOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, clearCart } from '../../store/slices/cartSlice'
import { orderService } from '../../services/order.service'
import { formatPrice } from '../../utils/formatPrice'
import './CheckoutPage.css'

const { Title, Text } = Typography
const { TextArea } = Input

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { user } = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('cod')

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^\d]/g, ''))
    return sum + (price * item.quantity)
  }, 0)
  
  const shippingFee = subtotal > 500000 ? 0 : 30000 // Free shipping over 500k
  const total = subtotal + shippingFee

  const handleFinish = async (values) => {
    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          book: item.book._id,
          quantity: item.quantity,
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^\d]/g, ''))
        })),
        shippingInfo: {
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
          city: values.city,
          district: values.district,
          ward: values.ward
        },
        paymentMethod: paymentMethod,
        totalPrice: total,
        shippingFee: shippingFee,
        notes: values.notes || ''
      }

      // Create order via API
      await orderService.create(orderData)
      
      message.success('Đặt hàng thành công!')
      dispatch(clearCart())
      
      // Navigate to order confirmation or order history
      setTimeout(() => {
        navigate('/account?tab=orders')
      }, 1500)
    } catch (error) {
      console.error('Create order error:', error)
      message.error(error.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại!')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <ShoppingCartOutlined style={{ fontSize: 64, color: '#ccc' }} />
            <Title level={4} style={{ marginTop: 16 }}>Giỏ hàng trống</Title>
            <Text type="secondary">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</Text>
            <div style={{ marginTop: 24 }}>
              <Button type="primary" onClick={() => navigate('/books')}>
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <Title level={2}>Thanh toán</Title>
      
      <Steps current={currentStep} style={{ marginBottom: 32 }}>
        <Steps.Step title="Thông tin giao hàng" icon={<EnvironmentOutlined />} />
        <Steps.Step title="Phương thức thanh toán" icon={<CreditCardOutlined />} />
        <Steps.Step title="Hoàn tất" icon={<CheckCircleOutlined />} />
      </Steps>

      <Row gutter={24}>
        {/* Left Column - Form */}
        <Col xs={24} lg={16}>
          <Card title="Thông tin giao hàng" className="checkout-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                  >
                    <Input placeholder="Nguyễn Văn A" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại' },
                      { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
                    ]}
                  >
                    <Input placeholder="0901234567" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input placeholder="example@email.com" size="large" />
              </Form.Item>

              <Form.Item
                label="Địa chỉ giao hàng"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <Input placeholder="Số nhà, tên đường" size="large" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Tỉnh/Thành phố"
                    name="city"
                    rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố' }]}
                  >
                    <Input placeholder="TP. Hồ Chí Minh" size="large" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Quận/Huyện"
                    name="district"
                    rules={[{ required: true, message: 'Vui lòng nhập quận/huyện' }]}
                  >
                    <Input placeholder="Quận 1" size="large" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phường/Xã"
                    name="ward"
                    rules={[{ required: true, message: 'Vui lòng nhập phường/xã' }]}
                  >
                    <Input placeholder="Phường Bến Nghé" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Ghi chú (tùy chọn)"
                name="notes"
              >
                <TextArea rows={3} placeholder="Ghi chú cho người bán..." />
              </Form.Item>

              <Divider />

              <Title level={5}>Phương thức thanh toán</Title>
              <Radio.Group 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: '100%' }}
              >
                <Card 
                  className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Radio value="cod">
                    <div>
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </div>
                    </div>
                  </Radio>
                </Card>

                <Card 
                  className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('bank')}
                  style={{ marginTop: 12 }}
                >
                  <Radio value="bank">
                    <div>
                      <strong>Chuyển khoản ngân hàng</strong>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                        Chuyển khoản trước, giao hàng sau khi xác nhận
                      </div>
                    </div>
                  </Radio>
                </Card>

                <Card 
                  className={`payment-option ${paymentMethod === 'momo' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('momo')}
                  style={{ marginTop: 12 }}
                >
                  <Radio value="momo">
                    <div>
                      <strong>Ví MoMo</strong>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                        Thanh toán qua ví điện tử MoMo
                      </div>
                    </div>
                  </Radio>
                </Card>
              </Radio.Group>

              <Form.Item style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit" size="large" block>
                  Đặt hàng
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Right Column - Order Summary */}
        <Col xs={24} lg={8}>
          <Card title="Đơn hàng của bạn" className="order-summary">
            <div className="cart-items">
              {cartItems.map((item) => {
                const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^\d]/g, ''))
                return (
                  <div key={item._id} className="cart-item">
                    <img src={item.book.image || 'https://placehold.co/60x80?text=Book'} alt={item.book.title} />
                    <div className="item-info">
                      <div className="item-title">{item.book.title}</div>
                      <div className="item-quantity">Số lượng: {item.quantity}</div>
                    </div>
                    <div className="item-price">
                      {formatPrice(price * item.quantity)}
                    </div>
                  </div>
                )
              })}
            </div>

            <Divider />

            <div className="summary-row">
              <Text>Tạm tính:</Text>
              <Text>{formatPrice(subtotal)}</Text>
            </div>

            <div className="summary-row">
              <Text>Phí vận chuyển:</Text>
              <Text>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</Text>
            </div>

            {shippingFee === 0 && (
              <div className="free-ship-note">
                <Text type="success" style={{ fontSize: 12 }}>
                  🎉 Bạn được miễn phí vận chuyển
                </Text>
              </div>
            )}

            <Divider />

            <div className="summary-row total">
              <Text strong style={{ fontSize: 16 }}>Tổng cộng:</Text>
              <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
                {formatPrice(total)}
              </Title>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
