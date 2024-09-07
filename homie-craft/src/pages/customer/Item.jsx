import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import Banner from '../../components/banner/Banner'
import ItemGallery from '../../components/gallerySection/ItemGallery'

function Item() {
    let {id} = useParams()
    const navhook = useNavigate()
    console.log(`Item With Id : ${id}`)
    const wishlistHandler = () => {
      alert('Item added to wishlist');
    }
  return (
    <div>
      <ItemGallery/>
      <div className=' profileButtons'>
        <ButtonSecondary name='Wishlist Item'  action={wishlistHandler} />
        <ButtonPrimary name='Buy Item'  />
      </div>
    </div>
  )
}

export default Item
