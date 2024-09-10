import React from 'react'
import './Banner.css' 
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
const Banner = (params) => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow:false,
    prevArrow:false
  };
  return (
    <div class="w-80 h-10">
        <Slider {...settings}>
            <div>
              <img src={params.image} alt="" />
            </div>
            <div>
              <img src={params.image} alt="" />
            </div>
            <div>
              <img src={params.image} alt="" />
            </div>
        </Slider>
    </div>
  )
}

export default Banner