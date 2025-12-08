import React from 'react'
import { styles } from './styles'

export default function ProductImages({ images = [], selected = 0, onSelect = () => {} }) {
  const imgs = images.length ? images : []

  return (
    <div style={styles.container}>
      {imgs.length > 1 && (
        <div style={styles.thumbColumn}>
          {imgs.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`thumb-${idx}`}
              style={{
                ...styles.thumbnail,
                ...(selected === idx ? styles.thumbnailActive : {})
              }}
              onClick={() => onSelect(idx)}
            />
          ))}
        </div>
      )}

      <div style={styles.mainImageWrap}>
        <img src={imgs[selected] || imgs[0] || ''} alt="product-main" style={styles.mainImage} />
      </div>
    </div>
  )
}
