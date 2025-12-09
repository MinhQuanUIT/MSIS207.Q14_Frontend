import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { bookService } from '../../services/book.service'

export default function BooksManagementPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      const response = await bookService.getAll({ limit: 1000 }) // Load all for admin
      // Backend returns: {success: true, data: [...books], total, count}
      const data = response.data.data || response.data
      setBooks(Array.isArray(data) ? data : [])
    } catch (error) {
      message.error('Không thể tải danh sách sách')
      console.error('Load books error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingBook(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    form.setFieldsValue(book)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await bookService.remove(id)
      message.success('Đã xóa sách')
      loadBooks()
    } catch (error) {
      message.error('Không thể xóa sách')
    }
  }

  const handleSubmit = async (values) => {
    try {
      if (editingBook) {
        await bookService.update(editingBook._id, values)
        message.success('Đã cập nhật sách')
      } else {
        await bookService.create(values)
        message.success('Đã thêm sách mới')
      }
      setModalVisible(false)
      loadBooks()
    } catch (error) {
      message.error('Không thể lưu sách')
    }
  }

  const columns = [
    { title: 'Tên sách', dataIndex: 'title', key: 'title' },
    { title: 'Tác giả', dataIndex: 'author', key: 'author' },
    { 
      title: 'Giá', 
      dataIndex: 'price', 
      key: 'price',
      render: (price) => `${price?.toLocaleString('vi-VN')}đ`
    },
    { 
      title: 'Đã bán', 
      dataIndex: 'sales', // Backend uses 'sales' not 'sold'
      key: 'sales',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.sales || 0) - (b.sales || 0)
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => (a.stock || 0) - (b.stock || 0)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock) => inStock ? '✅ Còn hàng' : '❌ Hết hàng'
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm sách mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={books}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingBook ? 'Sửa sách' : 'Thêm sách mới'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Tên sách" rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}>
            <Input placeholder="Nhập tên sách" />
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}>
            <Input placeholder="Nhập tên tác giả" />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
            <InputNumber 
              style={{ width: '100%' }} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              min={0}
            />
          </Form.Item>
          <Form.Item name="stock" label="Số lượng tồn kho" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="image" label="URL hình ảnh">
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} placeholder="Mô tả chi tiết về sách..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
