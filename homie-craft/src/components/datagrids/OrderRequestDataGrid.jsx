import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';




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
     
      axios.post(baseUrl + 'orderrequest/approve/' +orderId,{"message":"Accepted"},{
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
         })
  }
  
  const handleAccept = (id) => {
    acceptOrderHandler(id)
  };

  const handleReject = (id) => {
   rejectOrderHandler(id)
  };
  
const col = [
  { field: 'id', type: 'number', headerName: 'ID', width: 50 },

  {
    field: 'craftName',
    headerName: 'CraftName',
    width: 100
  },{
    field: 'quantity',
     type: 'text',
    headerName: 'Qty',
    width: 50
  },
  {
    field: 'purchaseMode',
    headerName: 'Purchase Mode',
    width: 130
  },{
    field: 'userMessage',
    headerName: 'Customer Message',
    width: 200
  },{
    field: 'createdDate',
    headerName: 'Request Date',
    width: 120
  },
  
  {
    field: 'action',
    headerName: 'Action',
    width: "150",
    renderCell: (params) => (
      
      params!=undefined &&
      <div style={{display:"flex"}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAccept(params.id)}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleReject(params.id)}
          style={{ marginLeft: 5 }}
        >
          Reject
        </Button>
      </div>
    ),
  },
];


  return (
    <Box sx={{ minHeight: 400, width: '100%' }}>
      <DataGrid
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
