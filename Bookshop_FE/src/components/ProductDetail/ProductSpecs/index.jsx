import React from 'react'
import { styles } from './styles'

export default function ProductSpecs({ product }) {
  if (!product) return null

  return (
    <div style={styles.wrap}>
      <table style={styles.table}>
        <tbody>
          <tr style={styles.row}>
            <td style={styles.cellLabel}>Tên sản phẩm</td>
            <td style={styles.cellValue}>{product.title}</td>
          </tr>
          <tr style={styles.row}>
            <td style={styles.cellLabel}>Tác giả</td>
            <td style={styles.cellValue}>{product.author || 'N/A'}</td>
          </tr>
          {product.category && (
            <tr style={styles.row}>
              <td style={styles.cellLabel}>Danh mục</td>
              <td style={styles.cellValue}>{product.category}</td>
            </tr>
          )}
          {product.isbn && (
            <tr style={styles.row}>
              <td style={styles.cellLabel}>ISBN</td>
              <td style={styles.cellValue}>{product.isbn}</td>
            </tr>
          )}
          {product.pages && (
            <tr style={styles.row}>
              <td style={styles.cellLabel}>Số trang</td>
              <td style={styles.cellValue}>{product.pages}</td>
            </tr>
          )}
          {product.publisher && (
            <tr style={styles.row}>
              <td style={styles.cellLabel}>Nhà xuất bản</td>
              <td style={styles.cellValue}>{product.publisher}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
