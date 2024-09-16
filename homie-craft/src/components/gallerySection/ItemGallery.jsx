import React, { useEffect, useState } from 'react'
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
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}
const ItemGallery = (props) => {
  
    let settings={
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      // arrows:false
    }
  return (props.images.length >0 ?
    <div className="image-container">
        <Slider {...settings}>
          {props.images.map(i=>{
            return <div>
            <img src={i} alt="" />
          </div>
          })}
       {/* <div >
        <img  src="https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain"  alt="" />
       </div>
       <div>
        <img  src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/30/12/sustainable-fashion-brands-women-indybest-0.jpg"  alt="" />
       </div>
       <div >
        <img  src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"  alt="" />
       </div> */}
       </Slider>
    </div>:
    <>No Images found</>
  )
}

export default ItemGallery