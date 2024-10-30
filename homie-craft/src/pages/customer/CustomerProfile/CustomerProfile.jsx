import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as Yup from "yup";
import 'yup-phone-lite';
import { getUser } from '../../../repository/userRepository/userRepository';
import { useFormik } from 'formik';
import axios from 'axios';

function CustomerProfile() {
  const [userData, setUserData] = useState({});
  let userId = localStorage.getItem("id");
  const navhook = useNavigate();

  useEffect(() => {
    getUser(userId).then(d => setUserData(d));
  }, [userId]);

  const [image, setImage] = useState([]);
  const handleFileChange = (event) => {
    setImage(event.target.files);
  };

  const baseURL = "http://localhost:5265/";

  const formik = useFormik({
    initialValues: {
      name: userData.name || '',
      mobile: userData.mobile || '',
      pic: null,
      houseNumber: userData.houseNumber || '',
      city: userData.city || '',
      state: userData.state || '',
      pinCode: userData.pinCode || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      mobile: Yup.string().phone('IN', true, "Enter a valid phone number"),
      houseNumber: Yup.string().required("House Number is Required"),
      city: Yup.string().required("City is Required"),
      state: Yup.string().required("State is Required"),
      pinCode: Yup.number().required("Pincode is required").min(100000, "Enter a valid Pincode").max(999999, "Enter a valid Pincode"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append('profilePic', image[i]);
      }
      formData.append('name', values.name);
      formData.append('Mobile', values.mobile);
      formData.append('houseNumber', values.houseNumber);
      formData.append('city', values.city);
      formData.append('state', values.state);
      formData.append('pinCode', values.pinCode);

      try {
        axios.put(`${baseURL}user/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
          navhook("/");
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  const defaultProfilePic = userData.name ? userData.name.charAt(0).toUpperCase() : '';

  return (
    <Container maxWidth="sm" sx={{ mt: 4, padding: 3 }}>
      <Typography variant='h4' align="center" gutterBottom>
        Profile
      </Typography>
      
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ display: 'flex' }}>
        {/* Left Section for Profile Picture and Upload */}
        <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: userData.profilePicURL ? 'transparent' : 'gray'
          }}>
            {userData.profilePicURL ? (
              <img src={userData.profilePicURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'orange', fontSize: '45px', fontWeight: 'bold' }}>
                {defaultProfilePic}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <label htmlFor="files">Update Profile Pic?</label>
            <TextField
              name="files"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: "image/*" }} 
              sx={{ marginLeft: 1 }}
            />
          </div>
        </Box>

        {/* Right Section for Input Fields */}
        <Box sx={{ flex: '2' }}>
          <TextField
            fullWidth
            label="Full Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Mobile No"
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            disabled
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            margin="normal"
          />

          <TextField
            fullWidth
            label="House Number"
            id="houseNumber"
            name="houseNumber"
            value={formik.values.houseNumber}
            onChange={formik.handleChange}
            error={formik.touched.houseNumber && Boolean(formik.errors.houseNumber)}
            helperText={formik.touched.houseNumber && formik.errors.houseNumber}
            margin="normal"
          />

          <TextField
            fullWidth
            label="City"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            margin="normal"
          />

          <TextField
            fullWidth
            label="State"
            id="state"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Pincode"
            id="pinCode"
            name="pinCode"
            type="number"
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
            helperText={formik.touched.pinCode && formik.errors.pinCode}
            margin="normal"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CustomerProfile;
