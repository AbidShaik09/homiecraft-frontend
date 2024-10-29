import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';


export default function DashboardCard(params) {
  const theme = useTheme()
  const navhook = useNavigate()
  const handleNavigate = ()=>{
    navhook(params.link)
  }
  return (
    
        
    <Card sx={{ width: 230,backgroundColor:theme.palette.secondary.paper }} className='btn' onClick={handleNavigate}>
      <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <Typography gutterBottom  sx={{textAlign:'center'}} >
          {params.heading}
        </Typography>
        <Typography variant="body1" component="div" sx={{ color: 'text.secondary',textAlign:'center'}}>
          {params.content}
        </Typography>
        
      </CardContent>
   
    </Card>
  );
}
