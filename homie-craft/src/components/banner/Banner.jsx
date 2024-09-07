import React from 'react'
import './Banner.css' 
const Banner = (params) => {
  return (
    <div class="ms-4" className='banner-container'>
        <div className='wrapper'>
            <div className='wrapper-holder'>
              <div ><img src={params.image} alt="" /></div>
              <div ><img src={params.image} alt="" /></div>
              <div ><img src={params.image} alt="" /></div>
              <div ><img src={params.image} alt="" /></div>
            </div>
        </div>
        <div className='button-holder'>
          <a href="#slider-img-1" className='button'></a>
          <a href="#slider-img-2" className='button'></a>
          <a href="#slider-img-3" className='button'></a>
          <a href="#slider-img-4" className='button'></a>
        </div>
    </div>
  )
}

export default Banner