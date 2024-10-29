import { Box, Card, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/card/DashboardCard'
import SalesGraph from '../../components/barGraph/SalesGraph';
import axios from 'axios';
import CraftCard from '../../components/card/CraftCard';
import ButtonPrimary from '../../components/button/primary/ButtonPrimary';
import Dashboard from '../../components/dashboard/Dashboard';
import RequsetCard from '../../components/RequestCard/RequestCard';
import dayjs from 'dayjs';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useNavigate } from 'react-router-dom';
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary';
import { useHomieCraftContext } from '../../context/HomieCraftContext';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

function CrafterHome() {
  
  const {token, setToken,userType,setUserType,id,setId} = useHomieCraftContext()
  const [salesData,setSalesData] = useState([]);
  const [earnings,setEarnings] = useState(0);
  
  const navhook= useNavigate()
  var baseUrl = 'http://localhost:5265/'
  
  var crafterId = id
  
  if(userType=="customer"){
    navhook("/")

  }
  const [crafts, setCrafts] = useState([])
  //const [activeOrderRows,setactiveOrderRows] = useState([]);
  const [orderRequests, setOrderRequests] = useState([])
  const [orders, setOrders] = useState([])
  const [activeOrders, setActiveOrders] = useState([])
  const historyHandler =()=>{
    navhook("orderHistory")
  }
  const addHandler=()=>{
    navhook("add-craft/"+crafterId)
  }
  const formattedDate = (createdDate) => dayjs(createdDate).format('DD/MM/YYYY');
  
  useEffect(() => {
    axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
       setCrafts(res.data);
    })
    
    axios.get("http://localhost:5265/OrderRequest/crafter/" + crafterId,{
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(res => {
       setOrderRequests(res.data.filter(f => f.status == "requested"));
    })
    console.log(baseUrl + "/OrderRequest/crafter/" + crafterId)
    axios.get("http://localhost:5265/Order/crafter/" + crafterId,{
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(res => {
      let x= res.data
      setOrders(x);
      setActiveOrders(x.filter(o=>o.isActive==true))
      
    })

    axios.get("http://localhost:5265/Crafter/sales/"+crafterId ,{
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(res => {
      let x= res.data
      setSalesData(x.sales)
      setEarnings(x.earningsThisMonth)
      
    })

  }, [])

  const activeOrderColumns= [
    { field: 'CraftName', headerName: 'Craft Name', width: 120 },
    
    {
      field: 'Qty',
      
      headerName: 'Qty',
      width: 30,
      editable: false,
    },{
      field: 'Status',
      headerName: 'Status',
      width: 90,
      editable: false,
    },
    {
      field: 'Payment',
      headerName: 'Payment',
      width: 85,
      editable: false,
    }
    ,{
      field: 'Price',
      headerName: 'Price',
      width: 75,
      editable: false,
    }
    
  ];
  
  let activeOrderRows = []

  
  
  
   function DataGridDemo() {
    return (
      <Box sx={{ height: 325, width: '100%' }}>
        <DataGrid
          rows={activeOrderRows}
          columns={activeOrderColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 4,
              },
            },
          }}
          pageSizeOptions={[4]}
          
          disableRowSelectionOnClick
        />
      </Box>
    );
  }
  return (
    <>
      <Dashboard salesData={salesData} rating={4} earnings={earnings} orderRequests = {orderRequests} />
      <Container sx={{  display: 'flex', flexDirection: { xl: 'row', l: 'row', s: 'row', xs:'column-reverse',md:'row',padding:'0' }}}>
      
        <Container sx={{ width: { xs: '100%', sm: '100%', md: '55%', padding:"0px"} }} >


          <Card sx={{ display: 'flex', marginTop: '50px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>

            <h4>My Crafts</h4>
            <Container sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
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
                <Container sx={{ maxWidth:"300px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ButtonPrimary action={addHandler} name="Add Crafts" />
                </Container>
              </div>
            </Container>
          </Card>


        </Container>

        <Container sx={{ width: { xs: '100%', sm: '100%', md: '45%' } }} >
          <Card sx={{ marginTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>
            <Container sx={{display:'flex', width:"100%", justifyContent:"space-between"}}>
              
            <h4>Active Orders</h4>
            <ButtonSecondary action={historyHandler} name="All Orders"/>
            </Container>

            <Container sx={{ display: 'flex',flexDirection: "column", justifyContent: 'center', padding: '20px 5px 0px 5px' }}>
            <DataGridDemo/>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>

                {

                  
                  activeOrders.length > 0 ?(
                    
                    activeOrders.map((c,i) => {
                      activeOrderRows.push({id:i+1,CraftName: c.craftName,PickUp:formattedDate(c.expectedPickup), Payment:c.purchaseMode, Qty:c.quantity,Price: c.price, Payment:c.paymentType, Status: c.status})
  
                    
                    }
                    )

                  )
                    
                    :<></>
                }

              </div>
              
            </Container>
            
          </Card>

          <Card sx={{ color: 'white', marginTop: '50px', padding: '40px 0px', width: '100%', backgroundColor: '#2d545e', border: '1px solid grey', borderRadius: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <h4 style={{}}>Order Requests</h4>
            <Container sx={{ display: 'flex', justifyContent: 'center', padding: '20px 5px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {
                  orderRequests.length > 0 ?
                    orderRequests.map(c => {
                      console.log("orderRequests")
                      console.log(orderRequests)
                      return (
                        
                        <RequsetCard setCrafts = {setCrafts} crafterId = {crafterId} orders={orders} setOrders={setOrders} orderId={c.id} quantity={c.quantity} createdDate={formattedDate(c.createdDate)} price={c.price} purchaseMode={c.purchaseMode} craftName={c.craftName} craftId = {c.craftId} setActiveOrders= {setActiveOrders} />
                      )
                    }
                    )
                    : <Typography>-No Requests-</Typography>
                }

              </div>
            </Container>
            

          </Card>

        </Container>





      </Container>



    </>
  )
}

export default CrafterHome