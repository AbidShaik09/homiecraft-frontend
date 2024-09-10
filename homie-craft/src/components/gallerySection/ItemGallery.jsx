import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './ItemGallery.css'

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
const ItemGallery = () => {
  
    var settings={
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    }
  return (
    <div className="image-container">
        <Slider {...settings}>
       <div className="images">
        <img classNameme="images" src="https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"  alt="" />
       </div>
       <div>
        <img classNameme="images" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/30/12/sustainable-fashion-brands-women-indybest-0.jpg"  alt="" />
       </div>
       <div >
        <img classNameme="images" src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"  alt="" />
       </div>
       </Slider>
    </div>
  )
}

export default ItemGallery