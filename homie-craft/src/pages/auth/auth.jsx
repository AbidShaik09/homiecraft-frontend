import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useHomieCraftContext } from '../../context/HomieCraftContext';

const Auth = () => {
    const codeHolder = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const {token,setToken,id,setId,userType,setUserType} = useHomieCraftContext()
    const code = codeHolder.get("code")
    console.log("code: ");
    console.log(codeHolder);
   
      if(codeHolder.get('code') )
        {
          axios.get(`http://localhost:5265/api/Auth/${codeHolder.get('code')}`).then((res)=>{
            localStorage.setItem('token',res.data.id_token)
            localStorage.setItem('id',res.data.id)
            localStorage.setItem('customerId',res.data.customerId)
            localStorage.setItem('crafterId',res.data.crafterId)
            localStorage.setItem("userType","customer")
            setToken(res.data.id_token)
            setUserType("customer")
            setId(res.data.id)
    
        })
    
        navigate('/')
    
    
        }
                
   
    
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