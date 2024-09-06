import React from 'react'
import ItemCard from '../itemCard/ItemCard'

function ItemHolder(params) {
  return (
    <>
      
      <div className="container   mt-5 mb-5 p-3 pr-5 rounded" style={{display:"flex",flexWrap:"wrap",gap:"25px",alignItems:"center",justifyContent:"center"}}>
      {
        params.items.map((c)=>{
          return (
            <div className="rounded" style={{boxShadow: "0 0 0px 2px rgba(0, 0, 0, 0.5)"}}>
            <ItemCard image={c.displayImage}  title={c.itemName} id= {c.id} price = {c.itemPrice} />
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default ItemHolder
