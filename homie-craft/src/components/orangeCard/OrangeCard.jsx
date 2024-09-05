import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function OrangeCard(params) {
  let id = params.id
  let title=params.title
  let description= params.description

  const DivWrapper = styled('div')(({ theme }) => ({

    backgroundColor: alpha(theme.palette.secondary.main,1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main)
    }
  }));
  const navhook = useNavigate()
  const navigateHandler =()=>{
    navhook('/categories/'+id)
  }
  
  return (
    <DivWrapper className='orange-card ' onClick={navigateHandler}>
        
    <Card className='btn'  sx={{height: 270,width: 350,}}>
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
        <Typography variant="body2" 
        sx={{ overflow: 'hidden'}}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>



    </DivWrapper>  );
}


