import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardCard from '../../components/card/DashboardCard'
import SalesGraph from '../../components/barGraph/SalesGraph';
import axios from 'axios';
import CraftCard from '../../components/card/CraftCard';
import ButtonPrimary from '../../components/button/primary/ButtonPrimary';
import Dashboard from '../../components/dashboard/Dashboard';

function CrafterHome() {
  const salesData = [12, 34, 0, 0, 0];
  var baseUrl = 'http://localhost:5265/'
  var crafterId = localStorage.getItem("crafter")
  const [crafts, setCrafts] = useState([])
  const [activeCrafts, setActiveCrafts] = useState([])
  useEffect(() => {
    axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
      console.log(res.data); setCrafts(res.data);

      setActiveCrafts(crafts.filter((c) => c.isAvailable))

    })
  }, [])
  return (
    <>
      <Dashboard salesData={salesData} earnings={salesData[salesData.length - 1]} />
      <Container>
        <h4>Active Crafts</h4>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {
              activeCrafts.length > 0 ?
                activeCrafts.map(c => {
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
        
      </Container>

    </>
  )
}

export default CrafterHome