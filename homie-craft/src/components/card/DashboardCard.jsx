import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function DashboardCard(params) {
  return (
    <Card sx={{ maxWidth: 270 }}>
      <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <Typography gutterBottom sx={{ color: 'text.secondary',textAlign:'center', fontSize: 14 }}>
          {params.heading}
        </Typography>
        <Typography variant="h5" component="div"sx={{textAlign:'center'}}>
          {params.content}
        </Typography>
        
      </CardContent>
   
    </Card>
  );
}
