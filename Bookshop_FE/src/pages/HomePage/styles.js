// Styles for HomePage using CSS-in-JS pattern
export const styles = {
  container: {
    padding: '20px 30px',
    background: '#f5f5f5',
    minHeight: '100vh',
    maxWidth: 1400,
    margin: '0 auto'
  },
  
  pageTitle: {
    marginBottom: 24,
    color: '#333'
  },
  
  sidebarCol: {
    paddingRight: 24
  },
  
  mainContent: {
    // Main content area styles
  },
  
  featuredSection: {
    marginTop: 24,
    background: '#fff',
    padding: 24,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  
  sectionTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 600
  },
  
  productGrid: {
    marginTop: 16
  },
  
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '28px 0'
  },
  
  loadMoreButton: {
    minWidth: 200,
    height: 40
  }
}

// Responsive breakpoints
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}

// Grid gutter configuration
export const gridConfig = {
  gutter: [24, 24],
  sidebarSpan: { xs: 24, sm: 24, md: 6, lg: 5, xl: 4 },
  contentSpan: { xs: 24, sm: 24, md: 18, lg: 19, xl: 20 },
  cardSpan: { xs: 12, sm: 12, md: 8, lg: 6, xl: 6 }
}
