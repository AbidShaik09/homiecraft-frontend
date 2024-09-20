import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert,  Snackbar } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CrafterRoute from '../../routes/crafterRoute'


const Login = () => {
  const [mobile,setMobile] = useState()
  const [password,setPassword] = useState()
  const [data,setData] = useState()
  const navigate= useNavigate()
  const handleSubmit=()=>{
    var url=""
    if(alignment=="customer"){url="http://localhost:5265/api/auth"}
    else{url="http://localhost:5265/api/auth/crafter"}
    axios.post(url,{
      mobile:mobile,
      password:password
    }).then((res)=>{setData(res.data)
      localStorage.setItem("token",(res.data.token))
      localStorage.setItem("userType",alignment)
      localStorage.setItem("id",(res.data.id))
      
      
      navigate("/")
    })
  }
  const [openSnack, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  const [alignment, setAlignment] = React.useState('customer');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div class="w-50 mt-5 m-auto" style={{padding:'15px',borderRadius:'10px',boxShadow:'0 0 13px 0px rgba(0, 0, 0, 0.5)',backgroundColor:'white'}}>
        <h4 style={{marginLeft:'20vw'}}>Login</h4>
        <div style={{alignItems:'center',padding:'10px'}}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                class="m-auto"
                >
                <ToggleButton value="customer">Customer</ToggleButton>
                <ToggleButton value="crafter">Crafter</ToggleButton>
            </ToggleButtonGroup>
          </div>
        <div class="mb-3">
            <TextField fullWidth id="filled-basic" label="Mobile" variant="outlined" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
        </div>
        <div class="mb-3">
            <TextField fullWidth id="filled-basic" label="Password" type='password' variant="outlined" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div class="d-flex">
            <ButtonPrimary name='Submit'  action={handleSubmit}/>
        </div>
        <div class="d-flex gap-3 mt-4"><p>Don't have an account?</p><p type="button" onClick={()=>navigate('/signup')} style={{color:'chocolate'}}><u>Sign up</u></p></div>
    </div>
  )
}

export default Login