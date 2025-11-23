import React, { useState } from 'react'
import './NavbarComponent.css'

const sampleItems = [
    'Art & Photography',
    'Biographies & Memoirs',
    'Business & Economics',
    'How-to - Self Help',
    "Children's Books",
    'Dictionary',
    'Education - Teaching',
    'Fiction - Literature',
    'Magazines',
    'Medical Books',
    'Parenting & Relationships',
    'Reference',
    'Science - Technology',
    'History, Politics & Social Sciences',
    'Travel & Holiday',
    'Cookbooks, Food & Wine'
]

const NavbarComponent = ({ title = 'Khám phá theo danh mục' }) => {
    const [open, setOpen] = useState(true)

    return (
        <aside className="navbar-card">
            <div className="navbar-header">
                <h3>{title}</h3>
            </div>

            <div className="navbar-body">
                <div className={`category-row ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                    <div className="category-title">English Books</div>
                    <div className="category-toggle">{open ? '▾' : '▸'}</div>
                </div>

                {open && (
                    <ul className="category-list">
                        {sampleItems.map((it, i) => (
                            <li key={i} className="category-item">{it}</li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    )
}

export default NavbarComponent