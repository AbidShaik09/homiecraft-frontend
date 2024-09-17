import { Box, Button, Checkbox, FormControlLabel, Container, TextField } from '@mui/material';
import React from 'react'
import { useFormik, FieldArray,  } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddCraft() {
  let {crafterId}= useParams()
  let baseURL = "http://localhost:5265"
  const navhook = useNavigate();
  const formik = useFormik({
    initialValues: {
      crafterId: crafterId,
      name: '',
      price: '',
      images: ["https://th.bing.com/th/id/OIP.zh__drP1cMFjtk8nkN3d7wHaHa?rs=1&pid=ImgDetMain"],
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
    onSubmit: (values) => {
      axios.post(baseURL+"/crafts/",values).then(
        alert("Item Added Successfully"),
        navhook("/")
        
      )
    },
  });

  return (





    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>

      <Container>
        
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
