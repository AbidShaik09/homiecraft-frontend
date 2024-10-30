import { Button, Card, Container, Typography } from '@mui/material'
import React from 'react'
import ButtonSecondary from '../button/secondary/ButtonSecondary'
import DataGridDemo from '../datagrids/DataGridDemo'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

function ActiveOrders(params) {
    let activeOrders = params.activeOrders
    
  const formattedDate = (createdDate) => dayjs(createdDate).format('DD/MM/YYYY');
    let activeOrderRows =[]
  return (
    <Container sx={{ width: { xs: '100%', sm: '100%', lg: '50%' } }} >
          <Card sx={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '18px 0px' }}>
            <Container sx={{display:'flex', width:"100%", justifyContent:"space-between"}}>
            
            <Typography variant='h5'>Active Orders</Typography>
            </Container>

            <Container sx={{ display: 'flex',flexDirection: "column", justifyContent: 'center', padding: '20px 5px 0px 5px' }}>
              <DataGridDemo activeOrderRows = {activeOrderRows}/>
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
        </Container>
  )
}

export default ActiveOrders