export const styles = {
  container: {
    background: '#fff',
    borderRadius: 8,
    padding: '24px',
    marginTop: 16
  },
  header: {
    fontSize: 20,
    fontWeight: 600,
    color: '#242424',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: '1px solid #ebebeb'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 16
  },
  productCard: {
    border: '1px solid #ebebeb',
    borderRadius: 8,
    padding: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
    display: 'block'
  },
  productImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 4,
    marginBottom: 8
  },
  productTitle: {
    fontSize: 13,
    color: '#242424',
    lineHeight: 1.4,
    marginBottom: 8,
    height: 36,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap'
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
    color: '#242424'
  },
  oldPrice: {
    fontSize: 13,
    color: '#808089',
    textDecoration: 'line-through'
  },
  discount: {
    fontSize: 12,
    color: '#ff424e',
    fontWeight: 500
  },
  adBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    padding: '2px 6px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600
  }
}
