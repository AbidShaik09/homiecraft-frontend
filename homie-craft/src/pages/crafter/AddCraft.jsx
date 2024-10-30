import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddCraft() {
  const { crafterId } = useParams();
  const baseURL = "http://localhost:5265";
  const navhook = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);

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
      images: Yup.array().min(2, 'At least 2 images must be uploaded'),
    }),
    onSubmit: (values) => {
      if (imageFiles.length < 2) {
        formik.setFieldError('images', 'At least 2 images must be uploaded');
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('images', imageFiles[i]);
      }

      formData.append('crafterId', crafterId);
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('material', values.material);
      formData.append('description', values.description);
      formData.append('quantity', values.quantity);
      formData.append('pickUpFromCrafter', false);
      formData.append('isavailable', true);

      axios.post(`${baseURL}/crafts/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => navhook("/"))
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
    
    if (files.length >= 2) {
      formik.setFieldError('images', undefined); 
      formik.setFieldValue('images', files); 
    } else {
      formik.setFieldValue('images', []); 
    }
  };

  const errorColor = 'red'; // Define the error color

  return (
    <Container maxWidth="sm" sx={{ mt: 4, padding: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        <b>Add Craft</b>
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>

        <Container sx={{ padding: "5px" }} spacing={2}>
          <Container item xs={12} sx={{ padding: "5px" }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Craft Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: formik.touched.name && formik.errors.name ? errorColor : 'grey',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
              }}
            />
          </Container>

          <Container item xs={12} sx={{ padding: "5px" }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: formik.touched.price && formik.errors.price ? errorColor : 'grey',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
              }}
            />
          </Container>

          <Container item xs={12} sx={{ padding: "5px" }}>
            <TextField
              fullWidth
              id="material"
              name="material"
              label="Material"
              value={formik.values.material}
              onChange={formik.handleChange}
              error={formik.touched.material && Boolean(formik.errors.material)}
              helperText={formik.touched.material && formik.errors.material}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: formik.touched.material && formik.errors.material ? errorColor : 'grey',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
              }}
            />
          </Container>

          <Container item xs={12} sx={{ padding: "5px" }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: formik.touched.description && formik.errors.description ? errorColor : 'grey',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
              }}
            />
          </Container>

          <Container item xs={12} sx={{ padding: "5px" }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: formik.touched.quantity && formik.errors.quantity ? errorColor : 'grey',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                  },
                },
              }}
            />
          </Container>
        </Container>

        <Container 
          item 
          xs={12} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <label htmlFor="files"><b>Upload Files</b></label>
          <input
            name="files"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'block', marginTop: '8px', marginBottom: '8px' }}
          />
          {formik.touched.images && formik.errors.images && (
            <div style={{ color: errorColor }}>{formik.errors.images}</div>
          )}
        </Container>

        <Container>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Container>
      </Box>
    </Container>
  );
}

export default AddCraft;
