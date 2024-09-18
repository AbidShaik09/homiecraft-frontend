import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert,  Snackbar } from '@mui/material'



const Login = () => {
  const [mobile,setMobile] = useState()
  const [password,setPassword] = useState()
  const [data,setData] = useState()
  const navigate= useNavigate()
  const handleSubmit=()=>{
    axios.post('http://localhost:5265/api/auth',{
      mobile:mobile,
      password:password
    }).then((res)=>{setData(res.data)
      localStorage.setItem("token",JSON.stringify(res.data.token))
      localStorage.setItem("userType",res.data.userType)
      localStorage.setItem("id", JSON.stringify(res.data.id))
      handleClick()
    })
  }
  const [openSnack, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
    navigate('/')
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  return (
    <div class="w-50 mt-5 m-auto">
        <h4>User Login</h4>
        <div class="mb-3">
            <TextField fullWidth id="filled-basic" label="Mobile" variant="outlined" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
        </div>
        <div class="mb-3">
            <TextField fullWidth id="filled-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div class="d-flex ms-5 gap-5">
            <ButtonSecondary name='Cancel' />
            <ButtonPrimary name='Submit'  action={handleSubmit}/>
        </div>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Login successful!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login