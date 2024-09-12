import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
export default function ItemCard(params) {
  let id = params.id
  let title=params.title
  let description= params.description
  let price = params.price

  const DivWrapper = styled('div')(({ theme }) => ({

    backgroundColor: alpha(theme.palette.secondary.main,1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main)
    }
  }));
  const navhook = useNavigate()
  const navigateHandler =()=>{
    navhook('/item/'+id)
  }
  
  return (
    <DivWrapper key={id} className='orange-card ' onClick={navigateHandler}>
        
    <Card className='btn'  sx={{height: 300,width: 350,}}>
      <CardMedia
        sx={{ height: 200,width: 320,objectFit:'cover'}}
        image={params.image}
        title={title}
        alt={title}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div"
          sx={{ overflow: 'hidden'}}
        >
          {title}
    
        </Typography>
        <Typography gutterBottom variant="h4" component="div"
          sx={{ overflow: 'hidden', fontWeight:'bold'}}
        >
         
          {'₹ '+ price} 
        </Typography>
        
      </CardContent>
    </Card>



    </DivWrapper>  );
}


