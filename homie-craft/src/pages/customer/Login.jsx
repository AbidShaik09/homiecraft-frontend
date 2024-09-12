import React from 'react'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import { TextField } from '@mui/material'

const Login = () => {
  return (
    <div class="w-50 mt-5 m-auto">
        <h4>Customer Login</h4>
        <div class="mb-3">
            <TextField id="filled-basic" label="Mobile" variant="outlined"/>
        </div>
        <div class="mb-3">
            <TextField id="filled-basic" label="Password" type='password' variant="outlined" />
        </div>
        <div>
            <ButtonSecondary name='Cancel' />
            <ButtonPrimary name='Submit'  />
        </div>
    </div>
  )
}

export default Login