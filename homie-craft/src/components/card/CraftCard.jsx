import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, FormControlLabel, Modal, Table, TextField } from '@mui/material';
import ButtonSecondary from '../button/secondary/ButtonSecondary';
import ButtonPrimary from '../button/primary/ButtonPrimary';
import { useState } from 'react';
import { CheckBox } from '@mui/icons-material';

export default function CraftCard(params) {
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
  const [craft,setCraft] = useState(c)
  
  console.log(craft);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div  >
      <Card className='btn' onClick={handleOpen} sx={{ width: 200 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={params.image}
          title={params.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>₹{params.price}</div> <div style={{ fontSize: '1rem', alignSelf: 'center' }}>Qty: <span style={{ color: 'green' }}>{params.quantity}</span></div>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', overflow: 'hidden' }}>
            {params.name}
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
                <TextField sx={{width:'100%'}} type="text" disabled={true} value={craft.name}  />
              </td>
            </tr>
            <tr className=' '>
              <td className='bold  grey '>
                Price
              </td>
              <td>
                <TextField sx={{width:'100%'}} type="text" disabled={true} value={craft.price}  />
              </td>
            </tr>
            <tr className=' '>
              <td className='bold  grey '>
                Material
              </td>
              <td>
                <TextField sx={{width:'100%'}} type="text" disabled={true} value={craft.material}  />
              </td>
            </tr>
            <tr className=' '>
              <td className='bold  grey '>
                Description
              </td>
              <td>
                <TextField multiline sx={{width:'100%'}} type="text" disabled={true} value={craft.description}  />
              </td>
            </tr>
            <tr className=' '>
              <td className='bold  grey '>
                Stock
              </td>
              <td>
                <TextField type="text" sx={{width:'100%'}}  disabled={true} value={craft.quantity}  />
              </td>
            </tr>
            <tr className=' '>
            <td className='bold  grey '>
              <FormControlLabel
            control={
              <Checkbox
                id="pickUpFromCrafter"
                name="pickUpFromCrafter"
                checked={craft.pickUpFromCrafter}
                disabled= {true}
              />
            }
            label="Pick up from crafter"
          />
              </td>
              <td className='bold  grey '>
              <FormControlLabel
            control={
              <Checkbox
                id="isAvailable"
                name="isAvailable"
                checked={craft.isAvailable}
                disabled= {true}
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
            <ButtonPrimary sx={{width:'100%'}} name={"Edit"} />

              </td>
            </tr>
            
            </tbody>
          </Table>
          
        </Box>
      </Modal>




    </div>

  );
}
