import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './SliderComponent.css'

import img1 from '../../assets/Images/2d09d0f1742dd78bdcc8eccff1702c50.png'
import img2 from '../../assets/Images/6839e1b6bf732b12f8dd0ee56dc93e7d.png'
import img3 from '../../assets/Images/d5a5bf8ea34feb00afa2ef43721be88d.jpg.webp'
import img4 from '../../assets/Images/f57b2ab6a239549336f847f993de6b1f.jpg.webp'

const slides = [img1, img2, img3, img4]

export default function SliderComponent() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="slider-wrap">
      <Slider {...settings}>
        {slides.map((src, i) => (
          <div key={i} className="slide-item">
            <div className="slide-card">
              <img src={src} alt={`slide-${i}`} className="slide-image" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
