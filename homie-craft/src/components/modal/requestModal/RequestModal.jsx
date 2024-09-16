import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonPrimary from '../../button/primary/ButtonPrimary';
import ButtonSecondary from '../../button/secondary/ButtonSecondary';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RequestModal(params) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonPrimary sx={{with:'100%'}} action={handleOpen} name={params.name}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message for Customer
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField color='white'   multiline rows={4} variant="outlined" inputProps={{ maxLength: 90 }} sx={{width: '100%'}} label="Your Message" value={params.message} onChange={e=>params.setMessage(e.target.value)}
/>
                <ButtonSecondary action={params.action} name={params.name}/>

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}