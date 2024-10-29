import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ItemGallery.css";
import { Container } from "@mui/material";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "100%",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "100%",
      }}
      onClick={onClick}
    />
  );
}
const ItemGallery = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return props.images.length > 0 ? (
    <Container sx={{ width: 500, height: 300, objectFit: "cover" }}>
      <Slider {...settings}>
        {props.images.map((i) => {
          return (
            <div>
              <img style={{ width: 450, height: 300 }} src={i} alt="" />
            </div>
          );
        })}
      </Slider>
    </Container>
  ) : (
    <>No Images found</>
  );
};

export default ItemGallery;
