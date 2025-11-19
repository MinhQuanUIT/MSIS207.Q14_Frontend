import React from 'react'
import './TypeProduct.css'

const types = [
  'Sách Kinh Tế',
  'Văn Học',
  'Khoa Học - Kỹ Thuật',
  'Thiếu Nhi',
  'Sách Điện Tử (Ebook)',
  'Văn Phòng Phẩm'
]

export default function TypeProduct() {
  return (
    <div className="type-tags-wrap" aria-label="Type product list">
      {types.map((t, i) => (
        <span key={i} className="type-tag">{t}</span>
      ))}
    </div>
  )
}
