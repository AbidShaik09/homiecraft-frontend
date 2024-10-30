import { Box, Button, Card, Container, Divider, IconButton, Typography } from '@mui/material'
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DataGridDemo from '../../components/datagrids/DataGridDemo';
import ActiveOrders from '../../components/crafter/ActiveOrders';
import ItemHolder from '../../components/itemHolder/ItemHolder';

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
  const [orderRequests, setOrderRequests] = useState([])
  const [orders, setOrders] = useState([])
  const [activeOrders, setActiveOrders] = useState([])
  const historyHandler =()=>{
    navhook("orderHistory")
  }
  const addHandler=()=>{
    navhook("add-craft/"+crafterId)
  }
  
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

  
  
  
  
  return (
    <Box sx={{padding:""}}>
      <Dashboard activeOrders={activeOrders} salesData={salesData} rating={4} earnings={earnings} orderRequests = {orderRequests} />
      <Divider />
      <Container sx={{  display: 'flex', flexDirection: { xl: 'row', l: 'row', s: 'row', xs:'column-reverse',md:'row',padding:'0' }}}>
        <br/>
      
        <Container sx={{ width: '100%' }} >
          <Card sx={{ display: 'flex', marginTop: '50px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>
          <Container sx={{display:'flex', alignItems:"center"}}>
            
          <Typography variant='h5'>My Crafts</Typography>
          
          <IconButton aria-label="add c" onClick={addHandler} color="primary">
          <AddCircleOutlineIcon />
          </IconButton>
            </Container>
            <Container sx={{ display: 'flex', padding: '20px 0px' }}>
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
              </div>



            </Container>
            
          </Card>
          
        

        </Container>
      </Container>
      
      </Box>
  )
}

export default CrafterHome