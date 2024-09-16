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

function CrafterHome() {
  
  const salesData = [0, 0, 10000, 0, 0, 0, 0, 1200, 1700, 0, 0, 1000];
  var baseUrl = 'http://localhost:5265/'
  var crafterId = localStorage.getItem("crafter")
  const [crafts, setCrafts] = useState([])

  const [orderRequests, setOrderRequests] = useState([])
  const [orders, setOrders] = useState([])

  const formattedDate = (createdDate) => dayjs(createdDate).format('DD/MM/YYYY');
  
  useEffect(() => {
    axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
      console.log(res.data); setCrafts(res.data);
    })
    console.log(baseUrl + "/OrderRequest/crafter/" + crafterId)
    axios.get("http://localhost:5265/OrderRequest/crafter/" + crafterId).then(res => {
      console.log("Data here: ")

      console.log(res.data); setOrderRequests(res.data.filter(f => f.status == "requested"));
    })
    console.log(baseUrl + "/OrderRequest/crafter/" + crafterId)
    axios.get("http://localhost:5265/Order/" + crafterId).then(res => {
      let x= res.data
      console.log(x); setOrders(x);
    })


  }, [])
  return (
    <>
      <Dashboard salesData={salesData} rating={4} earnings={salesData[salesData.length - 1]} />
      <Container sx={{  display: 'flex', flexDirection: { xl: 'row', l: 'row', s: 'row', xs:'column-reverse',md:'row',padding:'0' }}}>

        <Container sx={{ width: { xs: '100%', sm: '100%', md: '50%', lg: '60%', xl: '60%' } }} >


          <Card sx={{ display: 'flex', marginTop: '50px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>

            <h4>Active Crafts</h4>
            <Container sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {
                  crafts.length > 0 ?
                    crafts.map(c => {
                      return (
                        <>
                          <CraftCard quantity={c.quantity} image={c.images[0]} name={c.name} price={c.price} />

                        </>
                      )
                    }
                    )
                    : <Typography>-No crafts found-</Typography>
                }
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ButtonPrimary name="Add Crafts" />
                </Container>
              </div>
            </Container>
          </Card>


        </Container>

        <Container sx={{ width: { xs: '100%', sm: '100%', md: '50%', lg: '40%', xl: '40%' } }} >
          <Card sx={{ marginTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>

            <h4>Active Orders</h4>
            <Container sx={{ display: 'flex', justifyContent: 'center', padding: '20px 5px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {
                  orders.length > 0 ?
                    orders.map(c => {
                      return (
                            <OrderCard orders={orders} setOrders={setOrders} orderId={c.id} quantity={c.quantity} expectedPickup={formattedDate(c.expectedPickup)} price={c.price} purchaseMode={c.purchaseMode} craftName={c.craftName} status={c.status} type={c.type} paymentType = {c.paymentType} />
                      )
                    }
                    )
                    : <Typography>-No Requests-</Typography>
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
                      return (
                        <RequsetCard crafterId = {crafterId} orders={orders} setOrders={setOrders} orderId={c.id} quantity={c.quantity} createdDate={formattedDate(c.createdDate)} price={c.price} purchaseMode={c.purchaseMode} craftName={crafts.find(p => p.id == c.craftId).name} />
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