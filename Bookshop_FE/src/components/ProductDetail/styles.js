// Styles for ProductDetail Component
export const styles = {
  container: {
    background: '#fff',
    borderRadius: 8,
    padding: 24,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  
  imageGallery: {
    display: 'flex',
    gap: 16
  },
  
  thumbnailColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  
  thumbnail: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    border: '2px solid #e0e0e0',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  
  thumbnailActive: {
    borderColor: '#1890ff',
    boxShadow: '0 0 0 1px #1890ff'
  },
  
  mainImageContainer: {
    flex: 1,
    position: 'relative',
    background: '#fafafa',
    borderRadius: 8,
    overflow: 'hidden'
  },
  
  mainImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    maxHeight: 500
  },
  
  zoomIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    background: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 4,
    cursor: 'pointer'
  },
  
  infoContainer: {
    padding: '0 0 24px'
  },
  
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: '#333',
    lineHeight: 1.4,
    marginBottom: 16
  },
  
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #f0f0f0'
  },
  
  priceBlock: {
    background: '#fafafa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20
  },
  
  currentPrice: {
    fontSize: 32,
    fontWeight: 700,
    color: '#ff424e'
  },
  
  oldPrice: {
    fontSize: 16,
    color: '#999',
    textDecoration: 'line-through',
    marginLeft: 12
  },
  
  badge: {
    display: 'inline-block',
    background: '#ff424e',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    marginLeft: 12
  },
  
  featureList: {
    margin: '20px 0'
  },
  
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 0',
    fontSize: 14,
    color: '#666'
  },
  
  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24
  },
  
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333'
  },
  
  actionGroup: {
    display: 'flex',
    gap: 12
  },
  
  button: {
    height: 48,
    fontSize: 16,
    fontWeight: 600,
    flex: 1
  }
}
