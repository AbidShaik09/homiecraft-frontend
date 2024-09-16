import { TextField } from '@mui/material'
import React from 'react'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const Signin = () => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        mobile: Yup.string().matches(/^[6-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      });
      
    const formik = useFormik({
        initialValues:{name:"",mobile:"",password:"",houseno:"",city:"",state:"",pin:""},
        validationSchema:validationSchema,
        onSubmit:(values)=>{alert(JSON.stringify(values))}
    })

  return (
    <div>
        <div class="w-50 mt-5 m-auto">
            <h4>Customer Registration</h4>
            <div class="mb-3">
                <TextField fullWidth id="name" label="Name" variant="outlined" value={formik.values.name}  onChange={formik.handleChange}
                    error={formik.touched.name}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </div>
            <div class="mb-3">
                <TextField fullWidth id="mobile" label="Mobile" type='tel' variant="outlined" value={formik.values.mobile} onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.monile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
            </div>
            <div class="mb-3">
                <TextField fullWidth id="password" label="Password" type='password' variant="outlined" value={formik.values.password} onChange={formik.handleChange}
                    error={formik.touched.password}
                    helperText={formik.touched.password && formik.errors.password}
                />
            </div>
            <div class="mb-3">
                <TextField fullWidth id="houseno" label="House No." variant="outlined" value={formik.values.houseno} onChange={formik.handleChange}/>
            </div>
            <div class="mb-3">
                <TextField fullWidth id="city" label="City" variant="outlined" value={formik.values.city} onChange={formik.handleChange}/>
            </div>
            <div class="mb-3">
                <TextField fullWidth id="state" label="State" variant="outlined" value={formik.values.state} onChange={formik.handleChange}/>
            </div>
            <div class="mb-3">
                <TextField fullWidth id="pin" label="Pin Code"  variant="outlined" value={formik.values.pin} onChange={formik.handleChange}/>
            </div>
            <div class="mb-3">
                <h6>Upload your profile picture</h6>
                <input
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    color='primary'
                />
                {/* <Input fullWidth id="filled-basic" type='file' label="Profile Picture"  variant="outlined" /> */}
            </div>
            <div class="d-flex gap-5 ms-5">
                <ButtonSecondary name='Cancel' />
                <ButtonPrimary name='Submit' onClick={formik.handleSubmit} />
            </div>
        </div>
    </div>
  )
}

export default Signin