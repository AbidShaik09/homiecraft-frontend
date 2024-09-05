import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { alpha } from '@mui/material';
export default function OrangeCard(params) {

  let title=params.title
  let description= params.description

  const DivWrapper = styled('div')(({ theme }) => ({

    backgroundColor: alpha(theme.palette.secondary.main,1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main)
    }
  }));
  
  return (
    <DivWrapper className='orange-card'>
        
    <Card sx={{ maxWidth: 350,  }} >
      <CardMedia
        sx={{ height: 200,objectFit:'cover'}}
        image={params.image}
        title={title}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" >
          {description}
        </Typography>
      </CardContent>
    </Card>



    </DivWrapper>  );
}


