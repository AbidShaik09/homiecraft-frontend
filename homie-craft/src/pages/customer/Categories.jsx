import React from 'react'
import { useParams } from 'react-router-dom'

function Categories() {
    let {id} = useParams()
  return (
    <div>
      <h1>Category with id: {id}</h1>
    </div>
  )
}

export default Categories
