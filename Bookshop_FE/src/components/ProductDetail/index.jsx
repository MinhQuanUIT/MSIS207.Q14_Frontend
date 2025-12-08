import React, { useState } from 'react'
import { Rate, InputNumber, Button, Tag } from 'antd'
import { 
  ShoppingCartOutlined, 
  ThunderboltOutlined,
  ZoomInOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons'
import { styles } from './styles'

export default function ProductDetail({ 
  product, 
  onAddToCart, 
  onBuyNow 
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const images = product.images || [product.image]

  return (
    <div style={styles.container}>
      {/* Image Gallery */}
      <div style={styles.imageGallery}>
        {images.length > 1 && (
          <div style={styles.thumbnailColumn}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                style={{
                  ...styles.thumbnail,
                  ...(selectedImage === idx ? styles.thumbnailActive : {})
                }}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        )}
        
        <div style={styles.mainImageContainer}>
          <img
            src={images[selectedImage]}
            alt={product.title}
            style={styles.mainImage}
          />
          <div style={styles.zoomIcon}>
            <ZoomInOutlined style={{ fontSize: 20 }} />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div style={styles.infoContainer}>
        <h1 style={styles.title}>{product.title}</h1>

        <div style={styles.metaRow}>
          <div>
            <Rate disabled value={parseFloat(product.rating || 0)} style={{ fontSize: 14 }} />
            <span style={{ marginLeft: 8, fontSize: 14, color: '#666' }}>
              ({product.sold || 0} đánh giá)
            </span>
          </div>
          <div style={{ fontSize: 14, color: '#666' }}>
            Đã bán {(product.sold || 0).toLocaleString()}
          </div>
        </div>

        {/* Price */}
        <div style={styles.priceBlock}>
          <span style={styles.currentPrice}>
            {typeof product.price === 'number' 
              ? product.price.toLocaleString('vi-VN') + 'đ'
              : product.price
            }
          </span>
          {product.oldPrice && (
            <>
              <span style={styles.oldPrice}>
                {typeof product.oldPrice === 'number'
                  ? product.oldPrice.toLocaleString('vi-VN') + 'đ'
                  : product.oldPrice
                }
              </span>
              <span style={styles.badge}>
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Features/Badges */}
        {product.badges && product.badges.length > 0 && (
          <div style={styles.featureList}>
            {product.badges.map((badge, idx) => (
              <div key={idx} style={styles.featureItem}>
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quantity Selector */}
        <div style={styles.quantitySelector}>
          <span style={styles.label}>Số lượng:</span>
          <InputNumber
            min={1}
            max={product.stock || 99}
            value={quantity}
            onChange={setQuantity}
            size="large"
            style={{ width: 120 }}
          />
          {product.stock && (
            <span style={{ fontSize: 13, color: '#999' }}>
              Còn {product.stock} sản phẩm
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={styles.actionGroup}>
          <Button
            type="default"
            size="large"
            icon={<ShoppingCartOutlined />}
            style={styles.button}
            onClick={() => onAddToCart && onAddToCart(quantity)}
            disabled={!product.stock || product.stock === 0}
          >
            Thêm vào giỏ
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<ThunderboltOutlined />}
            style={{ ...styles.button, background: '#ff424e', borderColor: '#ff424e' }}
            onClick={() => onBuyNow && onBuyNow(quantity)}
            disabled={!product.stock || product.stock === 0}
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  )
}
