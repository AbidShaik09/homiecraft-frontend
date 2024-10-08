import React from 'react'
import './Banner.css' 
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
const Banner = (params) => {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows:false
  };
  return (
    <div>
        <Slider {...settings}>
            <div>
              <img src={params.image} alt="" />
            </div>
            <div>
              <img src={"http://localhost:5265/images/b2.jpg"} alt="" />
            </div>
            <div>
              <img src={"http://localhost:5265/images/b3.webp"} alt="" />
            </div>
        </Slider>
    </div>
  )
}

export default Banner