import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Divider, Tabs, message, Spin } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/slices/cartSlice'
import { bookService } from '../../services/book.service'
import ProductImages from '../../components/ProductDetail/ProductImages'
import ProductInfo from '../../components/ProductDetail/ProductInfo'
import ProductSpecs from '../../components/ProductDetail/ProductSpecs'
import PurchasePanel from '../../components/ProductDetail/PurchasePanel'
import SimilarProducts from '../../components/ProductDetail/SimilarProducts'
import CustomerReviews from '../../components/ProductDetail/CustomerReviews'
import { styles } from './styles'

const { TabPane } = Tabs

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await bookService.getById(id)
      const bookData = response.data.data || response.data
      
      // Extract category from description if available
      let category = 'Sách'
      if (bookData.description) {
        const categoryMatch = bookData.description.match(/Category:\s*([^\n]+)/i)
        if (categoryMatch) {
          const categoryMap = {
            'fiction': 'Văn Học',
            'fantasy': 'Kỳ Ảo',
            'scifi': 'Khoa Học Viễn Tưởng',
            'mystery': 'Trinh Thám',
            'business': 'Kinh Doanh',
            'technology': 'Công Nghệ',
            'history': 'Lịch Sử',
            'biography': 'Tiểu Sử',
            'psychology': 'Tâm Lý',
            'science': 'Khoa Học'
          }
          const catKey = categoryMatch[1].toLowerCase().trim()
          category = categoryMap[catKey] || categoryMatch[1]
        }
      }
      
      // Transform backend data to frontend format
      const transformedProduct = {
        id: bookData._id,
        title: bookData.title,
        author: bookData.author,
        category: category,
        rating: bookData.averageRating || bookData.rating || 0,
        sold: bookData.sales || bookData.sold || 0,
        price: bookData.price,
        oldPrice: bookData.oldPrice || null,
        badges: bookData.inStock ? ['Còn hàng'] : ['Hết hàng'],
        stock: bookData.stock || 0,
        images: bookData.image ? [bookData.image] : ['https://placehold.co/400x600?text=Book'],
        isbn: bookData.bookID || '',
        pages: 0,
        publisher: '',
        description: bookData.description || 'Chưa có mô tả',
        reviews: bookData.reviews || []
      }
      
      setProduct(transformedProduct)
    } catch (error) {
      console.error('Error loading product:', error)
      message.error('Không thể tải thông tin sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (qty = 1) => {
    if (!product) return
    
    // Create book object for cart
    const bookForCart = {
      _id: product.id,
      title: product.title,
      author: product.author,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
      inStock: product.stock > 0
    }
    
    dispatch(addItem({ book: bookForCart, quantity: qty }))
    message.success(`Đã thêm ${qty} sản phẩm vào giỏ hàng`)
  }

  const handleBuyNow = (qty = 1) => {
    if (!product) return
    
    // Create book object for cart
    const bookForCart = {
      _id: product.id,
      title: product.title,
      author: product.author,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
      inStock: product.stock > 0
    }
    
    dispatch(addItem({ book: bookForCart, quantity: qty }))
    message.success(`Đã thêm ${qty} sản phẩm vào giỏ hàng`)
    
    // Navigate to checkout page
    setTimeout(() => {
      navigate('/checkout')
    }, 500)
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 20 }}>Đang tải thông tin sản phẩm...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <p>Không tìm thấy sản phẩm</p>
      </div>
    )
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.breadcrumbSection}>
        <Breadcrumb
          items={[
            { href: '/', title: <HomeOutlined /> },
            { href: '/books', title: product.category },
            { title: product.title }
          ]}
        />
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <div style={styles.imageSection}>
            <ProductImages
              images={product.images}
              selected={selectedImage}
              onSelect={setSelectedImage}
            />
          </div>
        </div>

        <div style={styles.middleColumn}>
          <div style={styles.infoSection}>
            <ProductInfo product={product} />
          </div>

          <div style={styles.descriptionSection}>
            <Tabs defaultActiveKey="description">
              <TabPane tab="Mô tả sản phẩm" key="description">
                <div style={styles.descriptionContent}>
                  <p><strong>Tác giả:</strong> {product.author}</p>
                  <p><strong>Danh mục:</strong> {product.category}</p>
                  <Divider />
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              </TabPane>
              <TabPane tab="Thông số kỹ thuật" key="specs">
                <ProductSpecs product={product} />
              </TabPane>
            </Tabs>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.stickyWrapper}>
            <PurchasePanel
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            <div style={styles.sellerCard}>
              <div style={styles.sellerHeader}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: '#1890ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Nhà
                </div>
                <div>
                  <div style={styles.sellerName}>AHABOOKS</div>
                  <div style={{ fontSize: 12, color: '#52c41a' }}>Đã xác thực</div>
                </div>
              </div>
              <div style={styles.sellerStats}>
                <div style={styles.statRow}><span style={styles.statLabel}>Đánh giá</span><span style={styles.statValue}>4.8</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}>Sản phẩm</span><span style={styles.statValue}>5.000+</span></div>
                <div style={styles.statRow}><span style={styles.statLabel}>Tỉ lệ phản hồi</span><span style={styles.statValue}>98%</span></div>
              </div>
            </div>

            <div style={styles.deliveryCard}>
              <div style={styles.sectionLabel}>Thông tin vận chuyển</div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={styles.deliveryOption}><div style={styles.deliveryTitle}>Giao Thứ Bảy</div><div style={styles.deliveryDesc}>Dự kiến giao trước 19h</div></div>
              <div style={styles.deliveryOption}><div style={styles.deliveryTitle}>Đổi trả 30 ngày</div><div style={styles.deliveryDesc}>Hỗ trợ đổi trả</div></div>
              <div style={styles.deliveryOption}><div style={styles.deliveryTitle}>100% chính hãng</div><div style={styles.deliveryDesc}>Cam kết từ nhà bán</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <SimilarProducts 
        currentBookId={product.id} 
        author={product.author} 
        category={product.category} 
      />

      {/* Customer Reviews Section */}
      <CustomerReviews productRating={product.rating} totalReviews={152} />
    </div>
  )
}
