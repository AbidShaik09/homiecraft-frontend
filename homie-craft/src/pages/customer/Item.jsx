import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ItemGallery from '../../components/gallerySection/ItemGallery'
import axios from 'axios'

function Item() {
    let {id} = useParams()
    const [craft,setCraft] = useState({})
    useEffect(()=>{
      axios.get(`http://localhost:5265/crafts/${id}`).then((res)=>{
        setCraft(res.data)
      })
    },[])
  return (craft.length>0?
    <div>
      <div class="mt-3" style={{display:'flex'}}>
        <div style={{width:"50vw"}}><ItemGallery images={craft[0].images}/></div>
        <div class="mt-4">
          <h3>Delivery Options</h3>
          <div class="d-flex mt-5 gap-5">
            <ButtonPrimary name='Home Delivery'/>
            <ButtonPrimary name='Pick from Crafter'/>
          </div>
        </div>
      </div>
      <div class="mt-5 ms-5">
        <h2>{craft[0].name}</h2>
        <div class="d-flex gap-5">
          <h4>{'₹ '+craft[0].price}</h4>
          <ButtonSecondary name='Wishlist Item'  />
        </div>
        <h6 class="mt-2">{craft[0].description}</h6>
      </div>
    </div>:

    <>
      Item Not Found;
    </>


  )
}

export default Item
