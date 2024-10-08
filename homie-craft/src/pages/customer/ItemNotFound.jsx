import React from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate }  from 'react-router-dom';
const ItemNotFound = ()=> { 
    const  navigate=useNavigate();
  const handleItemClick = () => {
    navigate('/');
  };

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '300px', cursor: 'pointer', }}
      className="Item-Not-Found" onClick={handleItemClick} >
      <Typography variant="h4">Item Not Found</Typography>
    </Container>
  );
};

export default ItemNotFound;















// import React from 'react';
// import { Container,Typography,styled} from '@mui/material';

// const ItemNotFound = () => {
//   return (
//     <Container sx={{display:"flex", justifyContent:"center",alignItems:"center",marginTop:"300px"}} className="Item-Not-Found"> 
//     <Typography variant='h4'>Item Not Found </Typography>
//     </Container>
//   );
// };
// export default ItemNotFound;
