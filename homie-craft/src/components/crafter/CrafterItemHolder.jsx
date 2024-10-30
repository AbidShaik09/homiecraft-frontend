import React from 'react'
import CraftCard from '../card/CraftCard'
import { Skeleton, Typography } from '@mui/material'

function CrafterItemHolder(params) {
    //craft={c} quantity={c.quantity} image={c.images[0]} name={c.name} price={c.price}
    let crafts = params.crafts

    return (
        <div className='d-flex justify-content-center'>
          
          <div className="  mt-5 mb-5 p-3 pr-5 rounded" style={{display:"flex",flexWrap:"wrap",gap:"25px",maxWidth:'3000px',alignItems:"center",justifyContent:"center"}}>
          {
            params.items.length>0 ?
            params.items.map((c)=>{
              return (
                <>
                  {
                  crafts.length > 0 ?
                    crafts.map(c => {
                      return (
                        <>

                         {c!=null? <CraftCard craft={c} quantity={c.quantity} image={c.images[0]} name={c.name} price={c.price} />:<></>}

                        </>
                      )
                    }
                    )
                    : <Typography>-No crafts found-</Typography>
                }
                
                
                </>
                
                
              )
            }): <Skeleton variant="rectangular" width={210} height={118} />
            
          }
          </div>
        </div>
      )
}

export default CrafterItemHolder