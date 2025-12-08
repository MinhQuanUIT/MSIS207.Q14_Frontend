// Styles for ProductDetailPage - Tiki-inspired design
export const styles = {
  pageContainer: {
    background: '#f5f5f5',
    minHeight: '100vh',
    padding: '0 120px',
    paddingTop: 24,
    paddingBottom: 60
  },
  
  breadcrumbSection: {
    background: '#fff',
    padding: '12px 16px',
    marginBottom: 16,
    borderRadius: 4
  },
  
  mainContent: {
    display: 'flex',
    gap: 16,
    marginBottom: 16,
    position: 'relative'
  },
  
  leftColumn: {
    flex: '0 0 450px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },

  middleColumn: {
    flex: '1',
    maxWidth: 'calc(100% - 450px - 340px - 32px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  
  rightColumn: {
    flex: '0 0 340px'
  },
  
  stickyWrapper: {
    position: 'sticky',
    top: 80,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  
  productCard: {
    background: '#fff',
    borderRadius: 8,
    padding: 24,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  
  imageSection: {
    background: '#fff',
    borderRadius: 8,
    padding: 24
  },
  
  infoSection: {
    background: '#fff',
    borderRadius: 8,
    padding: 24,
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  
  brandBadge: {
    display: 'inline-block',
    background: '#e8f4ff',
    color: '#1890ff',
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 12
  },
  
  productTitle: {
    fontSize: 24,
    fontWeight: 500,
    color: '#333',
    lineHeight: 1.4,
    marginBottom: 16
  },
  
  ratingSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #f0f0f0'
  },
  
  ratingStars: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  
  ratingText: {
    fontSize: 14,
    color: '#666'
  },
  
  promotionSection: {
    background: '#fff9f0',
    border: '1px solid #ffe58f',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24
  },
  
  promotionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333',
    marginBottom: 8
  },
  
  promotionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 0',
    fontSize: 13,
    color: '#666'
  },
  
  descriptionSection: {
    background: '#fff',
    borderRadius: 8,
    padding: 24,
    marginTop: 16
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '2px solid #1890ff'
  },
  
  descriptionContent: {
    fontSize: 14,
    lineHeight: 1.8,
    color: '#666'
  },
  
  specsTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  
  specsRow: {
    borderBottom: '1px solid #f0f0f0'
  },
  
  specsLabel: {
    padding: '12px 16px',
    fontSize: 14,
    color: '#666',
    width: '30%',
    background: '#fafafa'
  },
  
  specsValue: {
    padding: '12px 16px',
    fontSize: 14,
    color: '#333'
  },
  
  sellerCard: {
    background: '#fff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  
  sellerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #f0f0f0'
  },
  
  sellerLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    objectFit: 'cover'
  },
  
  sellerName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333'
  },
  
  sellerStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: '#666'
  },
  
  statLabel: {
    color: '#999'
  },
  
  statValue: {
    fontWeight: 600,
    color: '#333'
  },
  
  deliveryCard: {
    background: '#fff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  
  sectionLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: '#242424'
  },
  
  deliveryOption: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  
  deliveryIcon: {
    fontSize: 20,
    color: '#1890ff'
  },
  
  deliveryInfo: {
    flex: 1
  },
  
  deliveryTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333',
    marginBottom: 4
  },
  
  deliveryDesc: {
    fontSize: 13,
    color: '#666'
  },
  
  reviewSection: {
    background: '#fff',
    borderRadius: 8,
    padding: 24,
    marginTop: 16
  },
  
  reviewSummary: {
    display: 'flex',
    gap: 32,
    marginBottom: 24,
    paddingBottom: 24,
    borderBottom: '1px solid #f0f0f0'
  },
  
  reviewScore: {
    textAlign: 'center'
  },
  
  scoreNumber: {
    fontSize: 48,
    fontWeight: 700,
    color: '#ff424e'
  },
  
  reviewItem: {
    padding: '16px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  
  reviewerName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333',
    marginBottom: 8
  },
  
  reviewContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 1.6
  }
}

// Responsive breakpoints
export const responsive = {
  mobile: '@media (max-width: 768px)',
  tablet: '@media (max-width: 1024px)',
  desktop: '@media (min-width: 1025px)'
}

// Mobile overrides
export const mobileStyles = {
  pageContainer: {
    padding: '0 16px',
    paddingTop: 16,
    paddingBottom: 40
  },
  
  mainContent: {
    flexDirection: 'column'
  },
  
  leftColumn: {
    flex: '1 1 100%'
  },
  
  middleColumn: {
    flex: '1 1 100%'
  },
  
  rightColumn: {
    flex: '1 1 100%'
  },
  
  productTitle: {
    fontSize: 18
  },
  
  currentPrice: {
    fontSize: 24
  }
}
