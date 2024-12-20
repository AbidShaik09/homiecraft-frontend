import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, Container, FormControlLabel, Modal, Table, TextField } from '@mui/material';
import ButtonSecondary from '../button/secondary/ButtonSecondary';
import ButtonPrimary from '../button/primary/ButtonPrimary';
import { useState } from 'react';
import { CheckBox } from '@mui/icons-material';
import { useFormik } from 'formik';
import axios from 'axios';

export default function CraftCard(params) {
  var baseURL = "http://localhost:5265/"

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    maxHeight:'80%',
    overflowY:"scroll",
    resize:'none',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  let c =params.craft
  const craft=c
  const [isEdit,setIsEdit] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setEditTrue=()=>{
    setIsEdit(true)
  }
  const setEditFalse=()=>{
    setIsEdit(false)
  }
  
  
  const formik = useFormik({
    initialValues:{
      name: craft.name,
      price: craft.price,
      quantity : craft.quantity,
      description: craft.description,
      isAvailable: craft.isAvailable
    },
    onSubmit:(values)=>{
      axios.put(baseURL+"crafts/"+craft.id,values).then(
        craft.name = values.name,
        craft.price = values.price,
        craft.quantity = values.quantity,
        craft.pickUpFromCrafter = false,
        craft.description=values.description,
        craft.isAvailable = values.isAvailable
      )
      handleClose()
    }

    
  })

  
  


  return (
    <div  >
      <Card className='btn' onClick={handleOpen} sx={{ width: 200 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={params.image}
          title={params.name}
        />
        <CardContent>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}} >
          
          <Typography noWrap gutterBottom variant="h6" component="span" sx={{ margin:"auto",  alignSelf:"center"}}>
             {"₹ " + craft.price.toLocaleString('en-IN')}
          </Typography>
          </Box>
          <Box sx={{display:"flex", alignItems:"center"}} >
            {craft.isAvailable?<>
            <Typography noWrap sx={{margin:"0px 4px 0px 0px"}}>
              Qty: 
            </Typography>
            <Typography noWrap color='secondary'>
              {craft.quantity}
            </Typography></>:<>
            <Typography noWrap color='red'>
              Inactive
            </Typography>
            </>}
          </Box>
          </Box>
          
          
          <Typography noWrap variant="body2" sx={{ color: 'text.secondary', overflow: 'hidden' }}>
            {craft.name}
          </Typography>

        </CardContent>

      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Table>
          <tbody>
          <tr className=' '>
              <td className='bold larger grey '>
                Craft Name
              </td>
              <td>
                <TextField sx={{width:'100%'}}
                id="name"
                name="name"
                 type="text" 
                 disabled={!isEdit} 
                 value={formik.values.name}
                 onChange={formik.handleChange}
                 />
              </td>
            </tr>
            <tr className=' '>
              <td className='bold  grey '>
                Price
              </td>
              <td>
                <TextField sx={{width:'100%'}} 
                id="price"
                name="price"
                type="number" 
                disabled={!isEdit} 
                value={formik.values.price}
                onChange={formik.handleChange}  />
              </td>
            </tr>
            
            <tr className=' '>
              <td className='bold  grey '>
                Description
              </td>
              <td>
                <TextField multiline sx={{width:'100%'}} type="text" 
                id="description"
                name="description"
                disabled={!isEdit} 
                value={formik.values.description}
                onChange={formik.handleChange}  />
              </td>
            </tr>
            <tr className=' '>
              <td className='bold  grey '>
                Stock
              </td>
              <td>
                <TextField type="number"
                id="quantity"
                name="quantity"
                sx={{width:'100%'}}  
                disabled={!isEdit} 
                value={formik.values.quantity} 
                onChange={formik.handleChange} />
              </td>
            </tr>
            <tr className=' '>
           
              <td className='bold  grey '>
              <FormControlLabel
            control={
              <Checkbox
                id="isAvailable"
                name="isAvailable"
                checked={formik.values.isAvailable}
                onChange={formik.handleChange}
                disabled= {!isEdit}
              />
            }
            label="Is Available"
          />
              </td>
              
            </tr>
            <tr>
              <td>
            <ButtonSecondary action={handleClose} name={"Cancel"} />

              </td>
              <td>

                {!isEdit ?<ButtonPrimary  sx={{width:'100%'}} action={setEditTrue} name={"Edit"} />:<ButtonPrimary  sx={{width:'100%'}} action={formik.handleSubmit} name={"Update"} />} 

              </td>
            </tr>
            
            </tbody>
          </Table>
          
        </Box>
      </Modal>




    </div>

  );
}
