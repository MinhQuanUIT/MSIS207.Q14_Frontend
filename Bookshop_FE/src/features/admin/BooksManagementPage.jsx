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
      const response = await bookService.getAll()
      setBooks(response.data)
    } catch (error) {
      message.error('Không thể tải danh sách sách')
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
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Đã bán', dataIndex: 'sold', key: 'sold' },
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
          <Form.Item name="title" label="Tên sách" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Tác giả" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="image" label="URL hình ảnh">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
