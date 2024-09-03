import React from 'react'
import { useParams } from 'react-router-dom'

function Item() {
    let {id} = useParams()
    console.log(`Item With Id : ${id}`)
  return (
    <div>
      Item With Id : {id}
    </div>
  )
}

export default Item
