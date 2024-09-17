import { Box, Button, Checkbox, FormControlLabel, Container, TextField, ImageListItem, ImageList } from '@mui/material';
import React, { useState } from 'react'
import { useFormik, FieldArray,  } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddCraft() {
  let {crafterId}= useParams()
  let baseURL = "http://localhost:5265"
  const navhook = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    setImageFiles(event.target.files);
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('images', imageFiles[i]);
    }
    

    formData.append('name',formik.values.name);
    formData.append('price',formik.values.price);
    formData.append('material',formik.values.material);
    formData.append('description',formik.values.description);
    formData.append('quantity',formik.values.quantity);
    formData.append('pickUpFromCrafter',formik.values.pickUpFromCrafter);

    try {
      axios.post(baseURL+"/crafts/",formData).then(
        alert("Item Added Successfully"),
        navhook("/")
        
      ).then(
        console.log('Files and data uploaded successfully')
      )
      
    } catch (error) {
      console.error('Error:', error);
    }

  };

  
  const formik = useFormik({
    initialValues: {
      crafterId: crafterId,
      name: '',
      price: '',
      images: [],
      material: '',
      description: '',
      quantity: '',
      pickUpFromCrafter: false,
     
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      price: Yup.number().required('Required').positive('Must be positive'),
      
      material: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      quantity: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
      pickUpFromCrafter: Yup.boolean(),
      
    }),
    onSubmit: (values)=>{
      const formData = new FormData();
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }
      
  
      formData.append('crafterId',crafterId);
      formData.append('name',values.name);
      formData.append('price',values.price);
      formData.append('material',values.material);
      formData.append('description',values.description);
      formData.append('quantity',values.quantity);
      formData.append('pickUpFromCrafter',values.pickUpFromCrafter);
      formData.append('isavailable',true);
      
      console.log("Form Data:")
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        axios.post(baseURL+"/crafts/",formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          console.log(formData),
          alert("Item Added Successfully"),
          navhook("/")
          
        )
        
      } catch (error) {
        console.error('Error:', error);
      }
  
    }
  });

  return  (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>

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


      <Container sx={{padding:"5px"}} spacing={2}>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Craft Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          
        </Container>
        
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="material"
            name="material"
            label="Material"
            value={formik.values.material}
            onChange={formik.handleChange}
            error={formik.touched.material && Boolean(formik.errors.material)}
            helperText={formik.touched.material && formik.errors.material}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <TextField
            fullWidth
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
        </Container>
        <Container item xs={12} sx={{padding:"5px"}}>
          <FormControlLabel
            control={
              <Checkbox
                id="pickUpFromCrafter"
                name="pickUpFromCrafter"
                checked={formik.values.pickUpFromCrafter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label="Pick up from crafter"
          />
        </Container>
        
      </Container>
      <Container>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>


      </Container>
      
    </Box>
  );
};






export default AddCraft
