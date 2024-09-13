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
  useEffect(() => {
    axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
      console.log(res.data); setCrafts(res.data);


    })
  }, [])
  return (
    <>
      <Dashboard salesData={salesData} earnings={salesData[salesData.length - 1]} />
      <Container sx={{ display: 'flex', flexDirection: 'row-reverse',margin:'15px' }}>





        <div style={{ width: '40%', }} >
          <Card sx={{ height: '100%',padding:'0px 30px', width: '100%',backgroundColor:'#e5e5e5', border: '1px solid red', borderRadius:'2px'}}>

            Order Requests here

          </Card>

        </div>



        <div style={{width:'60%'}} >
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
                    : <></>
                }
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <ButtonPrimary name="Add Crafts" />
                </Container>
              </div>
            </Container>




          </Card>
        </div>


      </Container>

    </>
  )
}

export default CrafterHome