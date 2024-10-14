import React, { useEffect, useState } from 'react'
import './CustomerProfile.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as Yup from "yup";
import 'yup-phone-lite';
import { getUser,updateUser } from '../../../repository/userRepository/userRepository';
import { useFormik } from 'formik';
import axios from 'axios';

function CustomerProfile() {

  const [userData,setUserData] = useState({})
  const [isloaded,setIsLoaded] = useState(false)
  let userId = localStorage.getItem("id") 
  const navhook = useNavigate()

  useEffect(()=>{
    
    var id = localStorage.getItem("id")
    getUser(id).then(d=>setUserData(d),console.log(userData))
    
     
   },[])
  const [image, setImage] = useState([]);
  const handleFileChange = (event) => {
    setImage(event.target.files);
  };
  const baseURL = "http://localhost:5265/"
  //const defaultPic = 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain'

   const formik = useFormik({
    initialValues : {
      name : userData.name,
      mobile : userData.mobile,
      pic : null,
      houseNumber : userData.houseNumber,
      city : userData.city,
      state : userData.state,
      pinCode : userData.pinCode
    },
    enableReinitialize:true,
    validationSchema: Yup.object({
      name : Yup.string().required("Name is Required"),
      mobile: Yup.string().phone('IN',true,"Enter a valid phone number"),
      houseNumber : Yup.string().required("House Number is Required"),
      city: Yup.string().required("City is Required"),
      state: Yup.string().required("State is Required"),
      pinCode: Yup.number().required("Pincode is required").min(100000,"Enter a valid Pincode").max(999999,"Enter a valid Pincode"),
      }),
    onSubmit: (values)=>{
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append('profilePic', image[i]);
      }
      formData.append('name',values.name);
      formData.append('Mobile',values.mobile);
      formData.append('houseNumber',values.houseNumber);
      formData.append('city',values.city);
      formData.append('state',values.state);
      formData.append('pinCode',values.pinCode);
      try {
        axios.put(baseURL+"user/"+userId,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          console.log(formData),
          navhook("/")
          
        )
        
      } catch (error) {
        console.error('Error:', error);
      }
  
    }
  });

  return (
    <>

    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
      
        
      
      <Container sx={{marginTop:"20px"}}>
      <Container>
      <Typography variant='h4' >
      Profile
    </Typography>
      <div className="container profilePicArea">
        <div className='circleWrapper'>
          <img className='userProfile' src={userData.profilePicURL}  />

        </div>

      </div>

      </Container>
    

      <Container sx={{display:"flex",justifyContent:"space-around",alignItems:"center", marginTop:"10px"}}>
            <label htmlFor="files">Update Profile Pic?</label>
            <TextField
              name="files"
              type="file"
              onChange={(event) => {
                handleFileChange(event)
              }}
            />
          </Container>
      </Container>


      <Container sx={{padding:"5px"}} spacing={2}>
      <Container item xs={12} sx={{padding:"5px"}}>
        
      <label htmlFor="name">Full Name</label>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={(formik.errors.name) }
            helperText={ formik.errors.name}
          />
        
        </Container>

        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="mobile">Mobile No</label>
          <TextField
            fullWidth
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.errors.mobile}
            helperText={formik.errors.mobile}
          />
        
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="houseNumber">H. No</label>
          <TextField
            fullWidth
            id="houseNumber"
            name="houseNumber"
            value={formik.values.houseNumber}
            onChange={formik.handleChange}
            error={formik.touched.houseNumber && Boolean(formik.errors.houseNumber)}
            helperText={formik.touched.houseNumber && formik.errors.houseNumber}
          />
        
        </Container>
        
        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="city">City</label>
          <TextField
            fullWidth
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        
        </Container>

        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="state">State</label>
          <TextField
            fullWidth
            id="state"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
        
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="pincode">Pincode</label>
          <TextField
            fullWidth
            id="pinCode"
            name="pinCode"
            type="number"
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
            helperText={formik.touched.pinCode && formik.errors.pinCode}
          />
        
        </Container>

        
        
      </Container>
      <Container>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>


      </Container>
      
    </Box>
    
    
    </>
    
  )
}

export default CustomerProfile
