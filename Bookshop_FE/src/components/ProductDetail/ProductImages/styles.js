export const styles = {
  container: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start'
  },
  thumbColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    minWidth: 70
  },
  thumbnail: {
    width: 64,
    height: 64,
    objectFit: 'cover',
    borderRadius: 6,
    border: '2px solid #f0f0f0',
    cursor: 'pointer'
  },
  thumbnailActive: {
    borderColor: '#1890ff'
  },
  mainImageWrap: {
    flex: 1,
    background: '#fff',
    borderRadius: 8,
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 360,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  },
  mainImage: {
    maxWidth: '100%',
    maxHeight: 520,
    objectFit: 'contain'
  }
}