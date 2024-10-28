import { Box, Container, Typography } from "@mui/material";
import React from "react";
import SalesGraph from "../barGraph/SalesGraph";
import DashboardCard from "../card/DashboardCard";
import StarIcon from '@mui/icons-material/Star';
import { Palette } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
const Dashboard=(params)=>{
  const theme = useTheme()
    
    
    return <div style={{backgroundColor: theme.palette.primary.main}}>
    <Container sx={{padding:{xs:'0',sm:'auto'}}} >
        <Typography variant="h3" component='h4' sx={{display:'flex',justifyContent:{xs:'center',md:'start'}}}>
        DashBoard
        </Typography>
      <Container sx={{display:'flex',flexDirection:{
        xs:'column',md:'row'
      }, justifyContent:'space-between', alignItems:'canter',padding:'50px 20px'}}>
      <Container sx={{display:'flex', width:'100%'}}>
             <SalesGraph  salesData={params.salesData} />
      </Container>


      <Container sx={{display:'flex',justifyContent:{xs:'space-between',sm:"space-around"},flexDirection:{xs:'column',sm:'row',md:'column',lg:'row'}}}>

      
      <Box sx={{width:200, height:100, alignSelf:'center',margin:'7px'}}>
      <DashboardCard heading='Earnings This Month' content={'₹'+params.earnings}/>
      </Box>
      

      </Container>
      

      </Container>
          </Container>
    </div>
}

export default Dashboard