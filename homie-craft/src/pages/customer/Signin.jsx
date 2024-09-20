import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, ToggleButton, Typography } from '@mui/material';
import * as Yup from "yup";
import 'yup-phone-lite';
import { useFormik } from 'formik';
import axios from 'axios';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function CrafterProfile() {

  const [userData,setUserData] = useState({})
  const [isloaded,setIsLoaded] = useState(false)
  let userId = localStorage.getItem("id") 
  const navhook = useNavigate()
  const [alignment, setAlignment] = React.useState('customer');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  
  const baseURL = "http://localhost:5265/"
  const navigate = useNavigate()

  const [image, setImage] = useState([]);
  const handleFileChange = (event) => {
    setImage(event.target.files);
  };
  //const defaultPic = 'https://th.bing.com/th/id/OIP.0YmnhQc7kf0h3EEYRAkgjQAAAA?rs=1&pid=ImgDetMain'

   const formik = useFormik({
    initialValues : {
      name : "",
      mobile : "",
      password:"",
      houseNumber : "",
      city : "",
      state :"",
      pinCode : "",
      latitude: "",
      longitude: "",
    },
    enableReinitialize:true,
    validationSchema: Yup.object({
      name : Yup.string().required("Name is Required"),
      mobile: Yup.string().required("Mobile number is required"),
      password:Yup.string().min(8,"Password should have minimum 8 characters").required("Password is required"),
      houseNumber : Yup.string().required("House Number is Required"),
      city: Yup.string().required("City is Required"),
      state: Yup.string().required("State is Required"),
      pinCode: Yup.number().required("Pincode is required").min(100000,"Enter a valid Pincode").max(999999,"Enter a valid Pincode"),
      latitude: Yup.number().required('Latitude is required').min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
      longitude: Yup.number().required('Longitude is required').min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180')
    }),
    onSubmit: (values)=>{
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append('ProfilePic', image[i]);
      }
      formData.append('name',values.name);
      formData.append('mobile',values.mobile);
      formData.append('password',values.password);
      formData.append('houseNumber',values.houseNumber);
      formData.append('city',values.city);
      formData.append('state',values.state);
      formData.append('pinCode',values.pinCode);
      formData.append('longitude',values.longitude);
      formData.append('latitude',values.latitude);
      if(alignment=="crafter"){
        
      formData.append('PickUpFromLocation',values.PickUpFromLocation);
      }
      var u=""
      if(alignment=='customer'){u="user"}
      else{u=alignment}
      try {
        axios.post(baseURL+u,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          console.log(formData),
          navhook("/login")
          
        ).catch(()=>{})
        
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
      <Typography variant='h4' sx={{marginLeft:'35vw'}}>
      Sign Up
    </Typography>

      </Container>
  
      </Container>


      <Container sx={{padding:"5px"}} spacing={2}>
      <div style={{marginLeft:"15vw"}}>
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
      <Container item xs={8} sx={{padding:"5px"}}>
        
      <label htmlFor="name">Full Name</label>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean((formik.errors.name)) && (formik.errors.name) }
            helperText={Boolean((formik.errors.name)) && formik.errors.name}
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
        
      <label htmlFor="password">Password</label>
          <TextField
            fullWidth
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={Boolean((formik.errors.password)) && (formik.errors.password) }
            helperText={Boolean((formik.errors.password)) && formik.errors.password}
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
        
        <Container item sx={{xs:12,md:6,padding:"5px"}} >
          
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

        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="latitude">Latitude</label>
          <TextField
            fullWidth
            id="latitude"
            name="latitude"
            type="number"
            value={formik.values.latitude}
            onChange={formik.handleChange}
            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
            helperText={formik.touched.latitude && formik.errors.latitude}
          />
        
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          
      <label htmlFor="longitude">Longitude</label>
          <TextField
            fullWidth
            id="longitude"
            name="longitude"
            type="number"
            value={formik.values.longitude}
            onChange={formik.handleChange}
            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
            helperText={formik.touched.longitude && formik.errors.longitude}
          />
        
        </Container>
        {alignment=="crafter" && <Container>
          <FormControlLabel
            control={
              <Checkbox
                id="PickUpFromLocation"
                name="PickUpFromLocation"
                checked={formik.values.PickUpFromLocation}
                onChange={formik.handleChange}
                
              />
            }
            label="Pick up from Location "
          />
        </Container>}
        
        <Container  sx={{display:"flex",justifyContent:"center",gap:"30px",alignItems:"center", marginTop:"10px"}}>
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
      <Container>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
      <div class="d-flex gap-3 mt-4"><h5>Already a user?</h5><h5 type="button" onClick={()=>navigate('/login')} style={{color:'chocolate'}}><u>Login</u></h5></div>
      </Container>
      
    </Box>
    
    
    </>
    
  )
}

export default CrafterProfile
