import React, { useState, useEffect } from 'react'
import { Input, Select, Button, Typography, Divider } from 'antd'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import './FilterSidebar.css'

const { Title } = Typography
const { Option } = Select

export default function FilterSidebar({ filters, onFilterChange, onClearFilters }) {
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(filters.search || '')

  // Sync with URL params and parent filters
  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    setSearchValue(urlSearch || filters.search || '')
  }, [filters.search, searchParams])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        onFilterChange({ ...filters, search: searchValue })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue, filters.sortBy]) // Only depend on searchValue and sortBy, not entire filters object

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSortChange = (value) => {
    onFilterChange({ ...filters, sortBy: value })
  }

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <Title level={5}>Lọc & Tìm Kiếm</Title>
        <Button 
          type="link" 
          size="small" 
          icon={<ClearOutlined />}
          onClick={onClearFilters}
        >
          Xóa bộ lọc
        </Button>
      </div>

      <Divider />

      {/* Search */}
      <div className="filter-section">
        <Title level={5} className="section-title">Tìm kiếm</Title>
        <Input
          placeholder="Tên sách, tác giả..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={handleSearchChange}
          allowClear
        />
      </div>

      <Divider />

      {/* Sort */}
      <div className="filter-section">
        <Title level={5} className="section-title">Sắp xếp</Title>
        <Select
          style={{ width: '100%' }}
          value={filters.sortBy || ''}
          onChange={handleSortChange}
          placeholder="Chọn cách sắp xếp"
        >
          <Option value="">Mặc định (Mới nhất)</Option>
          <Option value="price-asc">Giá thấp đến cao</Option>
          <Option value="price-desc">Giá cao đến thấp</Option>
          <Option value="sales">Bán chạy nhất</Option>
          <Option value="rating">Đánh giá cao</Option>
          <Option value="newest">Mới nhất</Option>
        </Select>
      </div>
    </div>
  )
}
