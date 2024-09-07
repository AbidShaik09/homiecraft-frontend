import React from 'react'
import './ItemGallery.css'
const ItemGallery = () => {
  return (
    <div>
        <div className='gallery-wrap' >
            <img src="https://th.bing.com/th/id/OIP.GG47jUbA5fuPPOM4hx5nuwHaJI?pid=ImgDet&w=178&h=219&c=7" id='backbtn' />
            <div className="gallery">
                <div>
                    <span><img src="https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain" alt="" /></span>
                    <span><img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/30/12/sustainable-fashion-brands-women-indybest-0.jpg" alt="" /></span>
                    <span><img src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" alt="" /></span>
                </div>
                <div>
                    <span><img src="https://th.bing.com/th/id/OIP.0oxXnJ17HjSmlMkYE6I9-QHaEo?rs=1&pid=ImgDetMain" alt="" /></span>
                    <span><img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/30/12/sustainable-fashion-brands-women-indybest-0.jpg" alt="" /></span>
                    <span><img src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" alt="" /></span>
                </div>
            </div>
            <img src="https://www.pngfind.com/pngs/m/691-6915975_slide-right-white-big-prev-and-next-arrow.png" id='nextbtn' />
        </div>
    </div>
  )
}

export default ItemGallery