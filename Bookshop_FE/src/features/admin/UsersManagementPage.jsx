import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag, Button, message, Space, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import api from '../../services/api'

const { Title } = Typography
const { confirm } = Modal

export default function UsersManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/users')
      setUsers(response.data.data || [])
    } catch (error) {
      console.error('Error loading users:', error)
      message.error('Không thể tải danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (userId) => {
    confirm({
      title: 'Xác nhận xóa người dùng',
      content: 'Bạn có chắc muốn xóa người dùng này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await api.delete(`/users/${userId}`)
          message.success('Đã xóa người dùng')
          loadUsers()
        } catch (error) {
          message.error('Không thể xóa người dùng')
        }
      }
    })
  }

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => phone || 'Chưa cập nhật'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? 'Admin' : 'User'}
        </Tag>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'default'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            disabled={record.role === 'admin'}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>Quản lý người dùng</Title>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}
