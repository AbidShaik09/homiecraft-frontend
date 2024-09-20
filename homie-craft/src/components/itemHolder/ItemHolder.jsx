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
              <div className="rounded" style={{boxShadow: "0 0 13px 0px rgba(0, 0, 0, 0.5)"}}>
            <ItemCard image={c.images[0]}  title={c.name} id= {c.id} price = {c.price} />
            </div>
            
            
            </>
            
            
          )
        }): <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
        
      }
      </div>
    </div>
  )
}

export default ItemHolder
