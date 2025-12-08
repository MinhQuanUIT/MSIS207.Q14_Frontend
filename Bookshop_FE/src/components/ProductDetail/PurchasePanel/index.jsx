import React, { useState } from 'react'
import { Button, InputNumber } from 'antd'
import { ShoppingCartOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { styles } from './styles'
import { formatPrice } from '../../../utils/formatPrice'

export default function PurchasePanel({ product, onAddToCart, onBuyNow }) {
  const [qty, setQty] = useState(1)
  if (!product) return null

  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  // Tính tổng giá theo số lượng
  const totalPrice = product.price * qty

  const handleAdd = () => {
    if (onAddToCart) onAddToCart(qty)
  }

  const handleBuy = () => {
    if (onBuyNow) onBuyNow(qty)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.sellerBadge}>
        <div style={styles.sellerIcon}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Đ</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={styles.sellerName}>GIVER BOOKS & MEDIA</div>
          <div style={styles.sellerVerified}>✓ OFFICIAL</div>
        </div>
      </div>

      <div style={styles.qtyRow}>
        <span style={styles.qtyLabel}>Số Lượng</span>
        <div style={styles.qtyControls}>
          <button 
            style={styles.qtyButton} 
            onClick={() => setQty(Math.max(1, qty - 1))}
            disabled={qty <= 1}
          >
            −
          </button>
          <input 
            type="text" 
            value={qty} 
            readOnly
            style={styles.qtyInput}
          />
          <button 
            style={styles.qtyButton} 
            onClick={() => setQty(Math.min(product.stock || 99, qty + 1))}
            disabled={qty >= (product.stock || 99)}
          >
            +
          </button>
        </div>
      </div>

      <div style={styles.priceSection}>
        <div style={styles.priceLabel}>Tạm tính</div>
        <div style={styles.price}>{formatPrice(totalPrice)}</div>
      </div>

      <div style={styles.actionGroup}>
        <Button 
          type="primary" 
          size="large"
          block
          style={styles.buyNow} 
          onClick={handleBuy}
        >
          Mua ngay
        </Button>
        <Button 
          size="large"
          block
          icon={<ShoppingCartOutlined />}
          style={styles.addToCart} 
          onClick={handleAdd}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  )
}
