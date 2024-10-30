import React from 'react'
import ItemCard from '../itemCard/ItemCard'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function ItemHolder(params) {
  return (
    <div className='d-flex justify-content-center'>
      
      <div className="  mt-5 mb-5 p-3 pr-5 rounded" style={{display:"flex",flexWrap:"wrap",gap:"25px",maxWidth:'3000px',alignItems:"center",justifyContent:"center"}}>
      {
        params.items.length>0 ?
        params.items.map((c)=>{
          return (
            <>
              <div className="rounded">
            <ItemCard  image={c.images[0]}  title={c.name} id= {c.id} price = {c.price} />
            </div>
            
            
            </>
            
            
          )
        }): <Skeleton variant="rectangular" width={210} height={118} />
        
      }
      </div>
    </div>
  )
}

export default ItemHolder
