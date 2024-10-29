import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import SalesGraph from "../barGraph/SalesGraph";
import DashboardCard from "../card/DashboardCard";
import StarIcon from '@mui/icons-material/Star';
import { Palette } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

import { LineChart } from '@mui/x-charts/LineChart';
const Dashboard=(params)=>{
  const theme = useTheme()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    
    return <div>
    <Container sx={{padding:{xs:'0',sm:'auto'}}} >
        
      <Container sx={{display:'flex',flexDirection:{
        xs:'column',md:'row'
      }, justifyContent:'space-between', alignItems:'canter',padding:'50px 20px'}}>
      

      <Container sx={{display:'flex',justifyContent:{xs:'space-between',sm:"space-around"},flexDirection:{xs:'column',sm:'row',md:'column',lg:'row'}}}>

      
      <Box sx={{width:200, height:100, alignSelf:'center',margin:'7px'}}>
      <DashboardCard heading='Order Requests' content={params.orderRequests.length} link="/orderRequests"/>
      </Box>
      <Box sx={{width:200, height:100, alignSelf:'center',margin:'7px'}}>
      <DashboardCard heading='Earnings This Month' content={"₹ "+params.earnings.toLocaleString('en-IN')}/>
      </Box>
      

      </Container>
      <Container sx={{display:'flex', width:'100%'}}>
             
      <LineChart
  xAxis={[
    {
      data: [1,2,3,4,5,6,7,8,9,10,11,12],
      label: 'Month',
    },
  ]}
  series={[
    {
      data: params.salesData,
      label: 'Sales',
      area: false,
    },
  ]}
  height={300}
  ChartsLegendProps={{
    display: true,
    position: 'top',
  }}
/>


      </Container>


      </Container>
          </Container>
    </div>
}

export default Dashboard