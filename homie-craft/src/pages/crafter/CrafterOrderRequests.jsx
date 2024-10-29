import React, { useEffect, useState } from 'react'
import OrderRequestDataGrid from '../../components/datagrids/OrderRequestDataGrid'
import { Container, Typography } from '@mui/material'

import { format } from 'date-fns';
import { useHomieCraftContext } from '../../context/HomieCraftContext';
import axios from 'axios';
function CrafterOrderRequests() {
  
  const {token, setToken,userType,setUserType,id,setId} = useHomieCraftContext()
  const [rows,setRows] = useState([]);
  const [crafts,setCrafts] = useState([]);
  const crafterId = id;
  const baseUrl = "http://localhost:5265/"
  useEffect(()=>{
    axios.get(baseUrl+"OrderRequest/crafter/" + crafterId,{
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(q => {
        let res=q.data
        for(let i=0;i<res.length;i++){
          console.log("hi")
          res[i].createdDate = format(new Date(res[i].createdDate), 'dd/MM/yyyy')
        
        }
        
       setRows(res.filter(f => f.status == "requested"));
    })

    axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
      setCrafts(res.data);
   })
  },[])
  return (
    <Container>
    
    <Typography variant='h3'>Order Requests</Typography>
    <OrderRequestDataGrid rows={rows} setRows={setRows} crafts={crafts} setCrafts = {setCrafts}/>
    
    </Container>
  )
}

export default CrafterOrderRequests