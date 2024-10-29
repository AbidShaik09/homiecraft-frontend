import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as Yup from "yup";
import 'yup-phone-lite';
import { useFormik } from 'formik';
import axios from 'axios';

function CrafterProfile() {
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState([]);
  let crafterId = localStorage.getItem("crafterId");
  const navhook = useNavigate();
  const token = localStorage.getItem("token");
  const baseURL = "http://localhost:5265/";

  useEffect(() => {
    axios.get(`${baseURL}crafter/${crafterId}`).then(response => {
      setUserData(response.data);
    });
  }, [crafterId]);

  const handleFileChange = (event) => {
    setImage(event.target.files);
  };

  const formik = useFormik({
    initialValues: {
      name: userData.name || '',
      mobile: userData.mobile || '',
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
        formData.append('ProfilePic', image[i]);
      }
      formData.append('Name', values.name);
      formData.append('Mobile', values.mobile);
      formData.append('HouseNumber', values.houseNumber);
      formData.append('City', values.city);
      formData.append('State', values.state);
      formData.append('PinCode', values.pinCode);

      axios.put(`${baseURL}crafter/${crafterId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        navhook("/");
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  });

  const defaultProfilePic = userData.name ? userData.name.charAt(0).toUpperCase() : '';

  return (
    <Container maxWidth="sm" sx={{ mt: 4, padding: 3 }}>
      <Typography variant='h4' align="center" gutterBottom>
        Crafter Profile
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: userData.profilePicUrl ? 'transparent' : 'gray'
          }}>
            {userData.profilePicUrl ? (
              <img src={userData.profilePicUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'orange', fontSize: '45px', fontWeight: 'bold' }}>
                {defaultProfilePic}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <label htmlFor="files">Update Profile Pic?</label>
          <TextField
            name="files"
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }} // Accept only image files
          />
        </div>

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
          disabled
          value={formik.values.mobile}
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
    </Container>
  );
}

export default CrafterProfile;
