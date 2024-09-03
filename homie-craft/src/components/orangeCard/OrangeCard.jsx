import nature from '../../../src/static_images/nature.jpg'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function OrangeCard() {
  return (
    <div className='orange-card' >
        
    <Card sx={{ maxWidth: 250 ,border:'2px solid black'}} >
      <CardMedia
        sx={{ height: 100 }}
        image={nature}
        title="Image Title"
        alt="Image not found"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Category Title
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Category Description
        </Typography>
      </CardContent>
    </Card>



    </div>  );
}


