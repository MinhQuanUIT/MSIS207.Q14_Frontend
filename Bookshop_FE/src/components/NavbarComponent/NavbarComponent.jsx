import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NavbarComponent.css'

// Map backend categories to Vietnamese
const bookCategories = [
    { key: 'fiction', label: 'Văn Học - Tiểu Thuyết' },
    { key: 'fantasy', label: 'Kỳ Ảo - Fantasy' },
    { key: 'scifi', label: 'Khoa Học Viễn Tưởng' },
    { key: 'mystery', label: 'Trinh Thám - Bí Ẩn' },
    { key: 'business', label: 'Kinh Doanh - Kỹ Năng' },
    { key: 'technology', label: 'Công Nghệ - Lập Trình' },
    { key: 'history', label: 'Lịch Sử - Chính Trị' },
    { key: 'biography', label: 'Tiểu Sử - Hồi Ký' },
    { key: 'psychology', label: 'Tâm Lý - Triết Học' },
    { key: 'science', label: 'Khoa Học - Tự Nhiên' }
]

const NavbarComponent = ({ title = 'Khám phá theo thể loại', onCategorySelect }) => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    const handleCategoryClick = (category) => {
        if (onCategorySelect) {
            onCategorySelect(category.key)
        } else {
            // If no parent handler, navigate to home with category filter
            navigate(`/?category=${category.key}`)
        }
    }

    return (
        <aside className="navbar-card">
            <div className="navbar-header">
                <h3>{title}</h3>
            </div>

            <div className="navbar-body">
                <div className={`category-row ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                    <div className="category-title">Thể Loại Sách</div>
                    <div className="category-toggle">{open ? '▾' : '▸'}</div>
                </div>

                {open && (
                    <ul className="category-list">
                        {bookCategories.map((category) => (
                            <li 
                                key={category.key} 
                                className="category-item"
                                onClick={() => handleCategoryClick(category)}
                                style={{ cursor: 'pointer' }}
                            >
                                {category.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    )
}

export default NavbarComponent