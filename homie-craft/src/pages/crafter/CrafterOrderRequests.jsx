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
  const updateRowsWithStock = () => {
    const updatedRows = rows.map(row => {
      const craft = crafts.find(c => c.id === row.craftId);
      return craft ? { ...row, stock: craft.stock } : row;
    });
    setRows(updatedRows);
  };



  useEffect(()=>{
    axios.get(baseUrl+"OrderRequest/crafter/" + crafterId,{
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(q => {
        let res=q.data
        for(let i=0;i<res.length;i++){
          res[i].createdDate = format(new Date(res[i].createdDate), 'dd/MM/yyyy')
        }
       setRows(res.filter(f => f.status == "requested"));
    }).then(axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
      let x=res.data;
      setCrafts(x);
      
      
      //setRows(newRows);
    

   }))

  },[])
  return (
    <Container sx={{marginTop:"30px", marginBottom:"10px"}}>
    
    <Typography sx={{padding:"10px 0px"}} variant='h5'>Order Requests</Typography>
    <OrderRequestDataGrid rows={rows} setRows={setRows} crafts={crafts} setCrafts = {setCrafts}/>
    
    </Container>
  )
}

export default CrafterOrderRequests