import { TextField } from '@mui/material'
import React, { useState } from 'react'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    
    const [name,setName] = useState()
    const [mobile,setMobile] = useState()
    const [password,setPassword] =useState()
    const [houseno,setHouseNo] = useState()
    const [city,setCity] = useState()
    const [state,setState] = useState()
    const [pin,setPin] = useState()
    const [url,setURl] = useState()
    const navigate = useNavigate()

    // const formik = useFormik({
    //     initialValues:{name:"",mobile:"",password:"",houseno:"",city:"",state:"",pin:""},
    //     validationSchema:Yup.object({
    //         name: Yup.string().required('Name is required'),
    //         mobile: Yup.string().matches(/^[6-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
    //         password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')}),
    //     onSubmit:(values)=>{alert(JSON.stringify(values))}
    // })
    const handleSubmit=()=>{
        axios.post('http://localhost:5265/user',{
            name:name,
            mobile:mobile,
            password:password,
            profilePicURL:url,
            houseNumber:houseno,
            city:city,
            state:state,
            pinCode:pin
        }).then(()=>{alert('Registration Successful!')})
        navigate('/')
    }
  return (
    <div>
        <div class="w-50 mt-5 m-auto">
            <h4>Customer Registration</h4>
            <div class="mb-3">
                <TextField fullWidth id="name" label="Name" variant="outlined" value={name}  onChange={(e)=>{setName(e.target.value)}}
                    // error={ Boolean(formik.errors.name) }
                    // helperText={Boolean(formik.errors.name) && formik.errors.name}
                />
            </div>
            <div class="mb-3">
                <TextField fullWidth id="mobile" label="Mobile" type='tel' variant="outlined" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}
                    // error={Boolean(formik.errors.mobile)}
                    // helperText={Boolean(formik.errors.mobile) && formik.errors.mobile}
                />
            </div>
            <div class="mb-3">
                <TextField fullWidth id="password" label="Password" type='password' variant="outlined" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                    // error={ formik.touched.password && Boolean(formik.errors.password)}
                    // helperText={formik.touched.password && formik.errors.password}
                />
            </div>
            <div class="mb-3">
                <TextField fullWidth id="houseno" label="House No." variant="outlined" value={houseno} onChange={(e)=>{setHouseNo(e.target.value)}}/>
            </div>
            <div class="mb-3">
                <TextField fullWidth id="city" label="City" variant="outlined" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
            </div>
            <div class="mb-3">
                <TextField fullWidth id="state" label="State" variant="outlined" value={state} onChange={(e)=>{setState(e.target.value)}}/>
            </div>
            <div class="mb-3">
                <TextField fullWidth type='number' id="pin" label="Pin Code"  variant="outlined" value={pin} onChange={(e)=>{setPin(e.target.value)}}/>
            </div>
            <div class="mb-3">
                <h6>Upload your profile picture</h6>
                <TextField fullWidth id="url" label="Profile Pic URL"  variant="outlined" value={url} onChange={(e)=>{setURl(e.target.value)}}/>
                {/* <input
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    color='primary'
                    value={url}
                    onChange={(e)=>{setURl(e.target.value)}}
                /> */}
                {/* <Input fullWidth id="filled-basic" type='file' label="Profile Picture"  variant="outlined" /> */}
            </div>
            <div class="d-flex gap-5 ms-5">
                <ButtonSecondary name='Cancel' />
                <ButtonPrimary name='Submit' action={handleSubmit} />
            </div>
        </div>
    </div>
  )
}

export default Signup