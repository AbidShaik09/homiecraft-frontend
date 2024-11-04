import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, IconButton } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import CheckIcon from '@mui/icons-material/Check';

import ClearIcon from '@mui/icons-material/Clear';
export default function OrderRequestDataGrid(params) {

   let baseUrl = 'http://localhost:5265/'
   let token = localStorage.getItem("token");
    useEffect(() => {
      
  },[]);

  var crafterId = localStorage.getItem("id")
   
    const rejectOrderHandler = (orderId) => {
        
      axios.post(baseUrl + 'orderrequest/reject/' +orderId,{"message":"Rejected"},{
        headers: {
          'Authorization': `Bearer ${token}`
        }} ).then(e => {  
           
           axios.get(baseUrl + 'order/crafter/'+crafterId).then(x=>{
              axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
                params.setCrafts(res.data);
                params.setRows(params.rows.length>0?params.rows.filter(row => row.id !== orderId):[]);
                
  
             })
           }
           )
           })    }
    const acceptOrderHandler = (orderId) => {
     
      params.setRows(params.rows.length>0?params.rows.filter(row => row.id !== orderId):[]);
      axios.post(baseUrl + 'orderrequest/approve/' +orderId,{"message":"Accepted"},{
      headers: {
        'Authorization': `Bearer ${token}`
      }} ).then(e => {  
         
         axios.get(baseUrl + 'order/crafter/'+crafterId).then(x=>{
            axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
              params.setCrafts(res.data);
              

           })
         }
         )
         })
  }
  
  const handleAccept = (id) => {
    acceptOrderHandler(id)
  };

  const handleReject = (id) => {
   rejectOrderHandler(id)
  };
  
const col = [
  
  {
    field: 'craftName',
    headerName: 'Craft Name',
    width: 250,
    renderHeader: () => (
      <strong>
        Craft Name
      </strong>
    ),
  },{
    field: 'quantity',
     type: 'text',
    headerName: 'Requested Quantity',
    width: 150,
    renderCell: (params) => (
      
      params!=undefined &&
      <div style={{display:"flex", justifyContent:"end"}}>
        {params.value}
        
      </div>
    ),
    renderHeader: () => (
      <strong>
       Requested Quantity
      </strong>
    ),
  },{
    field: 'price',
    headerName: 'Price',
    width: 200,
    renderCell: (params) => (
      
      params!=undefined &&
      <div style={{display:"flex", justifyContent:"end"}}>
        {params.value}
        
      </div>
    ),
    renderHeader: () => (
      <strong>
        Price
      </strong>
    ),
  }
  ,
  
  {
    field: 'purchaseMode',
    headerName: 'Purchase Mode',
    width: 200,
    renderHeader: () => (
      <strong>
        Purchase Mode
      </strong>
    ),
  },{
    field: 'createdDate',
    headerName: 'Request Date',
    width: 170,
    renderHeader: () => (
      <strong>
        Request Date
      </strong>
    ),
  },
  
  {
    field: 'action',
    headerName: 'Action',
    width: "130",
    renderCell: (params) => (
      
      params!=undefined &&
      <div style={{display:"flex"}}>
        
        <IconButton onClick={() => handleAccept(params.id)} aria-label="accept"  color="primary">
            <CheckIcon />
        </IconButton>
        <IconButton onClick={() => handleReject(params.id)}aria-label="reject"  color="secondary">
            <ClearIcon />
        </IconButton>
        
      </div>
    ),
    
    renderHeader: () => (
      <div style={{display:"flex", justifyContent:"center"}}>
         <strong >
        Accept/ Reject
      </strong>
      </div>
     
    ),
  },
];
 

  return (
    <Box sx={{ minHeight: 400, width: '100%' }}>
      <DataGrid
      sx={{
        ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
          "margin-top": "1em",
          "margin-bottom": "1em"
        }
      }}
        rows={params.rows}
        columns={col}
         initialState={{
           pagination: {
             paginationModel: {
               pageSize: 10,
             },
           },
         }}
        pageSizeOptions={[2,5,10,25,50,75]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
