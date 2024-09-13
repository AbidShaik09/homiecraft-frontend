import { Box, Card, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/card/DashboardCard'
import SalesGraph from '../../components/barGraph/SalesGraph';
import axios from 'axios';
import CraftCard from '../../components/card/CraftCard';
import ButtonPrimary from '../../components/button/primary/ButtonPrimary';
import Dashboard from '../../components/dashboard/Dashboard';

function CrafterHome() {
  const salesData = [0, 0, 10000, 0, 0, 0, 0, 1200, 1700];
  var baseUrl = 'http://localhost:5265/'
  var crafterId = localStorage.getItem("crafter")
  const [crafts, setCrafts] = useState([])
  
  const [orderRequests, setOrderRequests] = useState([])

  const addCraftsHandler=()=>{
    
  }
  useEffect(() => {
    axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
      console.log(res.data); setCrafts(res.data);
    })
    console.log(baseUrl+"/OrderRequest/crafter/"+crafterId)
    axios.get("http://localhost:5265/OrderRequest/crafter/"+crafterId).then(res => {
      console.log("Data here: ")
      console.log( res.data); setOrderRequests(res.data);
    })
  }, [])
  return (
    <>
      <Dashboard salesData={salesData} rating={4} earnings={salesData[salesData.length - 1]} />
      <Container sx={{display:'flex', justifyContent:'space-between', alignItems:'canter',padding:'50px 20px' }}>

        <Container sx={{width:'60%'}} >
          <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0px' }}>

            <h4>Active Crafts</h4>
            <Container sx={{ display: 'flex', justifyContent: 'center',padding:'20px 5px' }}>
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

        <Container sx={{ width: '40%', }} >
          <Card sx={{ height: '100%',padding:'50px 5px', width: '100%',backgroundColor:'#fff3b0', border: '1px solid grey', borderRadius:'2px',display:'flex', flexDirection:'column', alignItems:'center'}}>

            
          <h4>Order Requests</h4>
            <Container sx={{ display: 'flex', justifyContent: 'center',padding:'20px 5px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {
                      orderRequests.length > 0 ?
                      orderRequests.map(c => {
                        return (
                          <>
                           {c.userMessage}
  
                          </>
                        )
                      }
                      )
                      : <Typography>-No Requests-</Typography>
                }
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ButtonPrimary name="Add Crafts" />
                </Container>
              </div>
            </Container>

          </Card>

        </Container>



      </Container>

    </>
  )
}

export default CrafterHome