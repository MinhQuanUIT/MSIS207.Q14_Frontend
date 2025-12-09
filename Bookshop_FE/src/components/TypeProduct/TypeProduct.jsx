import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TypeProduct.css'

const bookCategories = [
  { key: 'fiction', label: 'Văn Học' },
  { key: 'fantasy', label: 'Kỳ Ảo' },
  { key: 'business', label: 'Kinh Doanh' },
  { key: 'technology', label: 'Công Nghệ' },
  { key: 'psychology', label: 'Tâm Lý' },
  { key: 'science', label: 'Khoa Học' }
]

export default function TypeProduct() {
  const navigate = useNavigate()

  const handleCategoryClick = (categoryKey) => {
    navigate(`/books?search=${categoryKey}`)
  }

  return (
    <div className="type-tags-wrap" aria-label="Book categories list">
      {bookCategories.map((category) => (
        <button
          key={category.key}
          className="type-tag"
          onClick={() => handleCategoryClick(category.key)}
          type="button"
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
