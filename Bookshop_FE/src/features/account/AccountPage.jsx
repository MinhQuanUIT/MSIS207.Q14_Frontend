import React, { useState, useEffect } from 'react'
import { Tabs, Card, Form, Input, Button, message, Avatar, Descriptions, Table, Tag, Spin } from 'antd'
import { UserOutlined, ShoppingOutlined, LockOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import userService from '../../services/user.service'
import { orderService } from '../../services/order.service'
import { formatPrice } from '../../utils/formatPrice'
import './AccountPage.css'

const { TabPane } = Tabs

export default function AccountPage() {
  const [searchParams] = useSearchParams()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const currentUser = useSelector((state) => state.auth.user)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'orders' ? '2' : '1')

  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()

  // Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchProfile()
    }
  }, [])

  // Auto-load orders if navigating to orders tab
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'orders') {
      setActiveTab('2')
      fetchOrders()
    }
  }, [searchParams])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await userService.getProfile()
      const userData = response.data.data
      setUser(userData)
      
      // Set form initial values
      form.setFieldsValue({
        name: userData.name,
        phone: userData.phone || '',
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      message.error('Không thể tải thông tin người dùng')
      setUser({}) // Set empty object to prevent infinite loading
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true)
      const response = await orderService.getMyOrders()
      const ordersData = response.data.orders || response.data.data || []
      
      // Transform orders data for table
      const transformedOrders = ordersData.map((order, index) => ({
        key: order._id || index,
        orderId: order._id?.substring(0, 8) || `ORD${index}`,
        date: new Date(order.createdAt).toLocaleDateString('vi-VN'),
        total: order.totalPrice,
        status: order.status || 'pending',
        items: order.items?.length || 0
      }))
      
      setOrders(transformedOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      // Don't show error if orders endpoint not implemented yet
      if (error.response?.status !== 404) {
        message.error('Không thể tải danh sách đơn hàng')
      }
      setOrders([])
    } finally {
      setOrdersLoading(false)
    }
  }

  const handleUpdateProfile = async (values) => {
    try {
      const response = await userService.updateProfile(user._id, values)
      const updatedUser = response.data.data
      setUser(updatedUser)
      message.success('Cập nhật thông tin thành công!')
    } catch (error) {
      console.error('Error updating profile:', error)
      message.error('Cập nhật thông tin thất bại')
    }
  }

  const handleChangePassword = async (values) => {
    try {
      // Backend expects password field for update
      await userService.changePassword(user._id, {
        password: values.newPassword
      })
      message.success('Đổi mật khẩu thành công!')
      passwordForm.resetFields()
    } catch (error) {
      console.error('Error changing password:', error)
      message.error('Đổi mật khẩu thất bại')
    }
  }

  const handleTabChange = (key) => {
    setActiveTab(key)
    // Fetch orders when switching to Orders tab
    if (key === '2' && orders.length === 0) {
      fetchOrders()
    }
  }

  const statusMap = {
    pending: { text: 'Chờ xử lý', color: 'gold' },
    paid: { text: 'Đã thanh toán', color: 'blue' },
    delivered: { text: 'Đã giao hàng', color: 'green' },
    cancelled: { text: 'Đã hủy', color: 'red' }
  }

  const orderColumns = [
    {
      title: 'Mã đơn',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total) => formatPrice(total)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusMap[status].color}>
          {statusMap[status].text}
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => message.info(`Xem chi tiết đơn ${record.orderId}`)}>
          Xem chi tiết
        </Button>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" />
          <p style={{ marginTop: 20 }}>Đang tải thông tin...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="account-page">
        <div className="account-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <p>Không thể tải thông tin người dùng</p>
        </div>
      </div>
    )
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="page-title">Tài khoản của tôi</h1>

        <Tabs activeKey={activeTab} defaultActiveKey="1" size="large" onChange={handleTabChange}>
          {/* Profile Tab */}
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                Thông tin cá nhân
              </span>
            } 
            key="1"
          >
            <Card>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                <h2 style={{ marginTop: 16 }}>{user.name}</h2>
                <p style={{ color: '#666' }}>{user.email}</p>
                {user.role === 'admin' && (
                  <Tag color="red" style={{ marginTop: 8 }}>ADMIN</Tag>
                )}
              </div>

              <Descriptions bordered column={1} style={{ marginBottom: 30 }}>
                <Descriptions.Item label="Họ tên">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{user.phone || 'Chưa cập nhật'}</Descriptions.Item>
                <Descriptions.Item label="Vai trò">
                  {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {user.isActive ? (
                    <Tag color="green">Đang hoạt động</Tag>
                  ) : (
                    <Tag color="red">Không hoạt động</Tag>
                  )}
                </Descriptions.Item>
              </Descriptions>

              <h3>Cập nhật thông tin</h3>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
              >
                <Form.Item 
                  name="name" 
                  label="Họ tên"
                  rules={[
                    { required: true, message: 'Vui lòng nhập họ tên' },
                    { max: 50, message: 'Họ tên không được quá 50 ký tự' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item 
                  name="phone" 
                  label="Số điện thoại"
                  rules={[
                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số' }
                  ]}
                >
                  <Input placeholder="0123456789" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Cập nhật thông tin
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          {/* Orders Tab */}
          <TabPane 
            tab={
              <span>
                <ShoppingOutlined />
                Đơn hàng của tôi
              </span>
            } 
            key="2"
          >
            <Card>
              <h3 style={{ marginBottom: 20 }}>Danh sách đơn hàng</h3>
              {ordersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Spin />
                  <p style={{ marginTop: 16 }}>Đang tải đơn hàng...</p>
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                  <ShoppingOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                  <p>Bạn chưa có đơn hàng nào</p>
                </div>
              ) : (
                <Table 
                  columns={orderColumns} 
                  dataSource={orders}
                  pagination={{ pageSize: 5 }}
                />
              )}
            </Card>
          </TabPane>

          {/* Change Password Tab */}
          <TabPane 
            tab={
              <span>
                <LockOutlined />
                Đổi mật khẩu
              </span>
            } 
            key="3"
          >
            <Card>
              <h3 style={{ marginBottom: 20 }}>Đổi mật khẩu</h3>
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handleChangePassword}
              >
                <Form.Item 
                  name="currentPassword" 
                  label="Mật khẩu hiện tại"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item 
                  name="newPassword" 
                  label="Mật khẩu mới"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item 
                  name="confirmPassword" 
                  label="Xác nhận mật khẩu mới"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Đổi mật khẩu
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
