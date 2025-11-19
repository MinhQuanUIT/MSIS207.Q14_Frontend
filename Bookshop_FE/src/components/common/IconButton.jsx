import React from 'react'
import { Button } from 'antd'

export default function IconButton({ icon, children, type = 'default', size = 'middle', onClick, className = '' }) {
  return (
    <Button type={type} icon={icon} size={size} onClick={onClick} className={className}>
      {children}
    </Button>
  )
}
