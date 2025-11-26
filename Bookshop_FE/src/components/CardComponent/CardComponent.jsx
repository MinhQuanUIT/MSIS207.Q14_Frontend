import React from 'react'
import { Card } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './CardComponent.css'

const { Meta } = Card

export default function CardComponent({
	_id = '',
	title = 'Product',
	author = '',
	rating = null,
	sold = null,
	badges = [],
	promos = [],
	shipping = '',
	image = 'https://via.placeholder.com/240x220/f0f0f0/666?text=Book',
	width = 240,
	hoverable = true,
	price = '',
	oldPrice = '',
	onClick
}) {
	const navigate = useNavigate()

	const handleClick = () => {
		if (onClick) {
			onClick()
		} else if (_id) {
			navigate(`/books/${_id}`)
		}
	}

	return (
		<Card
			hoverable={hoverable}
			className="product-card"
			style={{ width, height: '100%', cursor: 'pointer' }}
			bodyStyle={{ padding: 12, display: 'flex', flexDirection: 'column', height: '100%' }}
			onClick={handleClick}
			cover={
				<div className="cover-wrapper">
					<img draggable={false} alt={title} src={image} className="card-cover-image" />
					{badges && badges.length > 0 && (
						<div className="cover-badges">
							{badges.map((b, i) => (
								<span key={i} className="cover-badge">{b}</span>
							))}
						</div>
					)}
				</div>
			}
		>
			{/* badges */}
			{badges && badges.length > 0 && (
				<div className="product-badges">
					{badges.map((b, i) => (
						<span key={i} className="product-badge">{b}</span>
					))}
				</div>
			)}

			{/* Main content that grows to push price/footer down */}
			<div className="card-main">
				{/* product name */}
				<div className="stylenameproduct" title={title}>{title}</div>

				{/* author / vendor line (small uppercase) */}
				{author && <div className="product-author">{author}</div>}

				{/* rating and sold */}
				{(rating || sold) && (
					<div className="product-meta-row">
						{rating !== null && (
							<>
								<span style={{ marginRight: 6 }}>{rating}</span>
								<StarFilled style={{ fontSize: 12, color: '#faad14' }} />
							</>
							)}
						{sold !== null && <span className="product-sold">Đã bán {sold}</span>}
					</div>
				)}
			</div>

			{/* price area pinned above footer so prices align */}
			{(price || oldPrice) && (
				<div className="card-bottom">
					<div className="card-price-row">
						{price ? <div className="card-price">{price}</div> : null}
						{oldPrice ? <div className="card-old-price">{oldPrice}</div> : null}
					</div>
				</div>
			)}

			{/* promos + shipping sit in a reserved footer area so cards align */}
			<div className="card-footer">
				{promos && promos.length > 0 && (
					<div className="product-promos">
						{promos.map((p, i) => (
							<span key={i} className="product-badge product-promo">{p}</span>
						))}
					</div>
				)}

				{/* shipping label */}
				{shipping && (
					<div className="product-shipping">{shipping}</div>
				)}
			</div>

			{/* optional Meta description (kept minimal) */}
			{false && <Meta description={author} />}
		</Card>
	)
}
