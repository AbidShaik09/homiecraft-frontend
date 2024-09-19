import { Box, Button, Checkbox, FormControlLabel, Container, TextField, ImageListItem, ImageList } from '@mui/material';
import React, { useState } from 'react'
import { useFormik, FieldArray,  } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function AddCraft() {
  let {crafterId}= useParams()
  let baseURL = "http://localhost:5265"
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState();

  const handleFileChange = (event) => {
    setImageFiles(event.target.files);
  };
//   const handleSubmit = async () => {
//     const formData = new FormData();

//     formData.append('images', imageFiles);
//     formData.append('name',formik.values.name);
//     formData.append('mobile',formik.values.mobile);
//     formData.append('password',formik.values.password);
//     formData.append('houseno',formik.values.houseno);
//     formData.append('city',formik.values.city);
//     formData.append('pin',formik.values.pin);
//     formData.append('state',formik.values.state);
//     formData.append('latitude',formik.values.latitude);
//     formData.append('longitude',formik.values.longitude);

//     try {
//       axios.post(baseURL+"/crafts/",formData).then(
//         alert("Item Added Successfully"),
//         navigate("/")
        
//       ).then(
//         console.log('Files and data uploaded successfully')
//       )
      
//     } catch (error) {
//       console.error('Error:', error);
//     }

//   };

  
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      images: [],
      password: '',
      houseno: '',
      city: '',
     state:'',
     pin:'',
     latitude:'',
     longitude:''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits").required('Mobile number is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
      hoseno: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      pin: Yup.string().required('Required'),
      longitude: Yup.string().required('Required'),
      latitude: Yup.string().required('Required'),
      
    }),
    onSubmit: (values)=>{
      const formData = new FormData();
    formData.append('images', imageFiles);  
      formData.append('name',values.name);
      formData.append('mobile',values.mobile);
      formData.append('password',values.password);
      formData.append('houseno',values.houseno);
      formData.append('city',values.city);
      formData.append('state',values.state);
      formData.append('pin',values.pin);
      formData.append('latitude',values.latitude);
      formData.append('longitude',values.longitude);
      
      console.log("Form Data:")
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        axios.post(baseURL+`/${alignment}/`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          console.log(formData),
          alert("User Registered Successfully"),
          navigate("/indexHandler")
          
          
        )
        
      } catch (error) {
        console.error('Error:', error);
      }
  
    }
  });
  const [alignment, setAlignment] = React.useState('customer');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return  (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
        <h2 style={{marginLeft:'35vw'}}>Sign Up</h2>
        <div style={{marginLeft:'30vw',padding:'10px'}}>
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

      <Container sx={{padding:"5px"}} spacing={2}>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="mobile"
            name="mobile"
            label="Mobile"
            type="tel"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          
        </Container>
        
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="houseno"
            name="houseno"
            label="House Number"
            value={formik.values.houseno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.houseno && Boolean(formik.errors.houseno)}
            helperText={formik.touched.houseno && formik.errors.houseno}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="city"
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="state"
            name="state"
            label="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="pin"
            name="pin"
            label="Pin Code"
            value={formik.values.pin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pin && Boolean(formik.errors.pin)}
            helperText={formik.touched.pin && formik.errors.pin}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="latitude"
            name="latitude"
            label="Latitude"
            value={formik.values.latitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
            helperText={formik.touched.latitude && formik.errors.latitude}
          />
        </Container>
        <Container item xs={5} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="longitude"
            name="longitude"
            label="Longitude"
            value={formik.values.longitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.longitude && Boolean(formik.errors.longitude)}
            helperText={formik.touched.longitude && formik.errors.longitude}
          />
        </Container>
        <Container>
      <div>
            <label htmlFor="files">Upload Files</label>
            <input
              name="files"
              type="file"
              multiple
              onChange={(event) => {
                handleFileChange(event)
              }}
            />
          </div>
      </Container>
        
      </Container>
      <Container>

      <Button type="submit" onSubmit={formik.handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>

      <div class="d-flex gap-3 mt-4" style={{marginLeft:'30vw'}}>
                <h5>Already a user?</h5>
                <h5 type="button" onClick={()=>navigate('/login')} style={{color:'chocolate'}}><u>Login</u></h5>
            </div>
      </Container>
      
    </Box>
  );
};

export default AddCraft