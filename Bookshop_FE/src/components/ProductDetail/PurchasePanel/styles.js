export const styles = {
  wrap: {
    background: '#fff',
    borderRadius: 8,
    padding: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  sellerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
    borderBottom: '1px solid #ebebeb'
  },
  sellerIcon: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#0b74e5',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sellerName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#242424',
    marginBottom: 2
  },
  sellerVerified: {
    fontSize: 12,
    color: '#0b74e5',
    fontWeight: 500
  },
  qtyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: '#242424'
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ebebeb',
    borderRadius: 4,
    overflow: 'hidden'
  },
  qtyButton: {
    width: 32,
    height: 32,
    border: 'none',
    background: '#fff',
    color: '#808089',
    fontSize: 18,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
  },
  qtyInput: {
    width: 50,
    height: 32,
    border: 'none',
    borderLeft: '1px solid #ebebeb',
    borderRight: '1px solid #ebebeb',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 500,
    color: '#242424',
    outline: 'none'
  },
  priceSection: {
    paddingTop: 12,
    borderTop: '1px solid #ebebeb'
  },
  priceLabel: {
    fontSize: 14,
    color: '#808089',
    marginBottom: 8
  },
  price: {
    fontSize: 24,
    fontWeight: 500,
    color: '#242424'
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 8
  },
  buyNow: {
    height: 48,
    fontSize: 15,
    fontWeight: 500,
    background: '#ff424e',
    borderColor: '#ff424e',
    borderRadius: 4
  },
  addToCart: {
    height: 48,
    fontSize: 15,
    fontWeight: 400,
    color: '#0b74e5',
    borderColor: '#0b74e5',
    borderRadius: 4,
    background: '#fff'
  }
}
