import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategories, getCategory } from '../../repository/categoryRepository/categoryRepository'
import { Typography } from '@mui/material'
import ItemHolder from '../../components/itemHolder/ItemHolder'

function Categories() {
    let {id} = useParams()
    useEffect(()=>{

    },[])
    let [items,setItems]= useState([])
    useEffect(()=>{
      
    getCategory(id).then(res=>setItems(res))
    },[])
  return (
   
<>
<Typography gutterBottom variant="h3" component="div"
    sx={{ overflow: 'hidden', padding:'30px'}}>
    Category : {id}
   </Typography>
   <ItemHolder items={items}/>

</>
  )
}

export default Categories
