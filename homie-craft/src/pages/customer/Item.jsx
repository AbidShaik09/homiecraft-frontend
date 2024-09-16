import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ItemGallery from '../../components/gallerySection/ItemGallery'
import axios from 'axios'
import { Fab, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Add';

function Item() {
    let {id} = useParams()
    const [craft,setCraft] = useState({})
    useEffect(()=>{
      axios.get(`http://localhost:5265/crafts/${id}`).then((res)=>{
        setCraft(res.data)
      })
    },[])
    const [quantity,setQuantity] = useState(0)
    const quantityHandler=(newQuanity)=>{
      if(newQuanity>=0 && newQuanity<=craft[0].quantity)
        setQuantity(newQuanity)
    }
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
        <div class="d-flex gap-4 p-2">
          <h6>Select Quantity:</h6>
          <h4>{quantity}</h4>
          <Fab size="small"  aria-label="add" onClick={()=>{quantityHandler(quantity+1)}}>
            <AddIcon />
          </Fab>
          <Fab size="small" aria-label="remove" onClick={()=>{quantityHandler(quantity-1)}}>
            <RemoveIcon/>
          </Fab>
        </div>
        <p>Max quantity: {craft[0].quantity}</p>
      </div>
    </div>:

    <>
      Item Not Found;
    </>


  )
}

export default Item
