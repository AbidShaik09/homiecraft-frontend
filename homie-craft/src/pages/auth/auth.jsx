import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Auth = () => {
    const code=useParams()
    useEffect(()=>{
        axios.get(`http://localhost:5265/api/Auth/${code}`).then((res)=>{
            localStorage.setItem('token',res.data.token)
        })
    },[])
  return (
    <div
    style={{ 
        // backgroundImage: 'url(https://th.bing.com/th/id/OIP.z6-MbmuxjSh2Tiw0CnQBwAHaEK?w=334&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '89.3vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
         <Stack spacing={2} direction="row" alignItems="center">
      <CircularProgress size="5rem" />
    </Stack>
    </div>
  )
}

export default Auth