import { Box, Container } from "@mui/material";
import React from "react";
import SalesGraph from "../barGraph/SalesGraph";
import DashboardCard from "../card/DashboardCard";

const Dashboard=(params)=>{
    
    
    return <div style={{backgroundColor:'#fff3b0'}}>
    <Container>
      <h3>DashBoard</h3>
      <Container sx={{display:'flex', justifyContent:'space-between', alignItems:'canter',padding:'50px 20px'}}>
      <div>
    
      <SalesGraph salesData={params.salesData} />
      </div>

      <Box sx={{width:200, height:100, alignSelf:'center'}}>
      <DashboardCard heading='Earnings This Month' content={params.earnings}/>
      </Box>
      

      </Container>
          </Container>
    </div>
}

export default Dashboard