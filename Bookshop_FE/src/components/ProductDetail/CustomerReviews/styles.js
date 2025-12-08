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
    marginBottom: 20
  },
  mainContent: {
    display: 'flex',
    gap: 24
  },
  leftSection: {
    flex: '0 0 280px',
    paddingRight: 24,
    borderRight: '1px solid #ebebeb'
  },
  overallTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#242424',
    marginBottom: 12
  },
  ratingScore: {
    fontSize: 48,
    fontWeight: 700,
    color: '#242424',
    lineHeight: 1,
    marginBottom: 8
  },
  ratingStars: {
    marginBottom: 8
  },
  ratingCount: {
    fontSize: 14,
    color: '#808089',
    marginBottom: 24
  },
  ratingBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  },
  barStars: {
    width: 80,
    display: 'flex',
    gap: 2
  },
  progressBar: {
    flex: 1,
    height: 8,
    background: '#ebebeb',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: '#ffc400',
    borderRadius: 4
  },
  barCount: {
    width: 30,
    textAlign: 'right',
    fontSize: 13,
    color: '#808089'
  },
  rightSection: {
    flex: 1
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
    alignItems: 'center'
  },
  filterLabel: {
    fontSize: 14,
    color: '#242424',
    marginRight: 8
  },
  filterButton: {
    padding: '6px 12px',
    border: '1px solid #ebebeb',
    borderRadius: 4,
    background: '#fff',
    fontSize: 13,
    color: '#808089',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  reviewCard: {
    padding: 16,
    border: '1px solid #f0f0f0',
    borderRadius: 8
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#242424'
  },
  reviewDate: {
    fontSize: 13,
    color: '#808089'
  },
  reviewContent: {
    fontSize: 14,
    color: '#242424',
    lineHeight: 1.6,
    marginBottom: 12
  },
  reviewFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBottom: 12
  },
  featureItem: {
    fontSize: 13,
    color: '#52c41a',
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  negativeItem: {
    color: '#ff4d4f'
  },
  reviewActions: {
    display: 'flex',
    gap: 12,
    paddingTop: 12,
    borderTop: '1px solid #f0f0f0'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    border: '1px solid #ebebeb',
    borderRadius: 4,
    background: '#fff',
    fontSize: 13,
    color: '#808089',
    cursor: 'pointer'
  },
  reviewImages: {
    display: 'flex',
    gap: 8,
    marginBottom: 12
  },
  reviewImage: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 4,
    cursor: 'pointer'
  }
}
