import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CraftCard(params) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={params.image}
        title={params.name}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{display:'flex',justifyContent:'space-between'}}>
          <div>{params.price}</div> <div style={{fontSize:'1rem',alignSelf:'center'}}>Qty: <span style={{color:'green'}}>{params.quantity}</span></div>
        </Typography>
        <Typography  variant="body2" sx={{ color: 'text.secondary', overflow:'hidden'}}>
          {params.name}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Unlist</Button>
      </CardActions>
    </Card>
  );
}
