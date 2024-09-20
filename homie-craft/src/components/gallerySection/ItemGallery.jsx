import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './ItemGallery.css'
import { Container } from '@mui/material';

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
      // nextArrow: <NextArrow />,
      // prevArrow: <PrevArrow />,
      arrows:false
    }
  return (props.images.length >0 ?
    <Container  sx={{ width: 300, height: 300 ,objectFit:'cover' }}>
        <Slider {...settings}>
          {props.images.map(i=>{
            return <div>
            <img style={{width: 250, height: 200}} src={i} alt="" />
          </div>
          })}
      
       </Slider>
    </Container>:
    <>No Images found</>
  )
}

export default ItemGallery