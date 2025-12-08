import React from 'react'
import { Rate, Tag } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { styles } from './styles'

export default function ProductInfo({ product }) {
  if (!product) return null

  return (
    <div style={styles.wrap}>
      <div style={styles.badgeRow}>
        <Tag color="blue">FREESHIP XTRA</Tag>
        <Tag color="gold">30 ngày đổi trả</Tag>
        <Tag color="green">Chính hãng</Tag>
      </div>

      <div style={styles.title}>{product.title}</div>

      <div style={styles.meta}>
        <Rate disabled value={parseFloat(product.rating || 0)} />
        <div style={styles.metaItem}>
          {product.rating || 0}
          <span style={styles.metaSub}> ({product.sold || 0} đánh giá)</span>
        </div>
        <div style={styles.metaDivider} />
        <div style={styles.metaItem}>Đã bán {(product.sold || 0).toLocaleString()}</div>
      </div>

      <div style={styles.shippingBlock}>
        <EnvironmentOutlined style={{ color: '#1890ff' }} />
        <div>
          <div style={styles.shippingLine}>
            Giao đến <strong>Q.1, P. Bến Nghé, Hồ Chí Minh</strong>
            <a style={styles.shippingLink}>Đổi</a>
          </div>
          <div style={styles.shippingSub}>Dự kiến giao từ 13h - 18h, Miễn phí 16.500đ</div>
        </div>
      </div>

      {product.badges && product.badges.length > 0 && (
        <div style={styles.featureBlock}>
          {product.badges.map((b, i) => (
            <div key={i} style={styles.featureItem}>• {b}</div>
          ))}
        </div>
      )}
    </div>
  )
}
