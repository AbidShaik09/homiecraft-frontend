import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ItemGallery from '../../components/gallerySection/ItemGallery'
import Button from '@mui/material/Button';
import axios from 'axios'
import { Alert, Fab, Snackbar, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Item() {
    let {id} = useParams()
    const [craft,setCraft] = useState({})
    const [price,setPrice] = useState()
    const [crafter,setCrafter] = useState({})
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    const handleClickOpenHome = () => {
      if(localStorage.getItem("userType")=="customer"){
        setOpen(true);
        setPurchaseMode('Home Delivery')
      }
      else{
        navigate('/login')
      }
    };
    const handleClickOpenPick = () => {
      if(localStorage.getItem("userType")=="customer"){
        setOpen(true);
        setPurchaseMode('Pick from crafter')
      }
      else{
        navigate('/login')
      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(()=>{
      axios.get(`http://localhost:5265/crafts/${id}`).then((res)=>{
        console.log(res.data)
        setCraft(res.data)
        setPrice(res.data[0].price)
        axios.get(`http://localhost:5265/crafter/${res.data[0].crafterId}`).then((res)=>{
          setCrafter(res.data)

        })
      })
    },[])
    const [quantity,setQuantity] = useState(0)
    const [userMessage,setUserMessage] = useState()
    const [purchaseMode,setPurchaseMode] = useState()
    const quantityHandler=(newQuanity)=>{
      if(newQuanity>=0 && newQuanity<=craft[0].quantity)
        setQuantity(newQuanity)
    }

    const orderRequestHandler=()=>{
        axios.post(`http://localhost:5265/orderrequest`,{
          
          userId:localStorage.getItem("id"),
          craftId:id,
          crafterId:craft[0].crafterId,
          purchaseMode:purchaseMode,
          quantity:quantity,
          status:"requested",
          price:craft[0].price * quantity,
          userMessage:userMessage
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }}).then(()=>{handleClick()});
        setOpen(false);
    }
    const [openSnack, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  return (craft.length>0?
    <div>
      <div class="mt-3" style={{display:'flex'}}>
        <div style={{width:"50vw"}}><ItemGallery images={craft[0].images}/></div>
        <div class="mt-4">
          <h3>Delivery Options</h3>
          <div class="d-flex mt-3 gap-5">
            <ButtonPrimary name='Home Delivery' action={handleClickOpenHome}/>
            {craft[0].pickUpFromCrafter==true?<ButtonPrimary name='Pick from Crafter' action={handleClickOpenPick}/>:<>in person not available</>}
          </div>
        </div>
      </div>
      <div class="mt-5 ms-5 d-flex" >
        <div>
          <h2>{craft[0].name}</h2>
          <div class="d-flex gap-5">
            <h4>{'₹ '+craft[0].price}</h4>
          </div>
          <h6 class="mt-2">{craft[0].description}</h6>
        </div>
        <div style={{marginLeft:'15vw',display:'flex',flexDirection:'column', boxShadow:'0px 0px 10px 0px()',padding:'10px'}}>
          <div><h3>Crafter Details:</h3></div>
          <div class="d-flex gap-3">
            <div>
              <div class="d-flex">Crafter Name:<h5><b>{crafter.name}</b></h5></div>
              <div class="d-flex">House Number:<h5><b>{crafter.houseNumber}</b></h5></div>
              <div class="d-flex">View Location</div>
            </div>
            <div><img style={{width:'20vw', height:'20vh',maxHeight:'125px',maxWidth:'125px',objectFit:'cover',borderRadius:'50%',padding:'1px'}} src={crafter.profilePicUrl} alt="" class="w-10 h-10"/></div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Request for order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div class="gap-4 p-2">
              <div class="d-flex">
              <div class="d-flex gap-2 p-3">
                <h5>Select Quantity:</h5>
                <h4>{quantity}</h4>
              </div>
              <div style={{display:'flex',flexDirection:'column',border:'1px solid black',borderRadius:'20px'}}>
                <AddIcon type="submit" onClick={()=>{quantityHandler(quantity+1)}}/>
                <RemoveIcon type="button" onClick={()=>{quantityHandler(quantity-1)}}/>
              </div>
              <p style={{marginLeft:'10vw'}}>Max Quantity: {craft[0].quantity}</p>
              </div>
              <h5 class="mt-3 ms-3">Payable Amount:{price * quantity}</h5>

            </div>
            <TextField fullWidth id="outlined-basic" label="Enter customization details" variant="outlined" value={userMessage} onChange={(e)=>{setUserMessage(e.target.value)}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonSecondary action={handleClose} name='Cancel'/>
          <ButtonPrimary autoFocus action={orderRequestHandler} name='Submit'/>
        </DialogActions>
      </Dialog>
      <div>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your order request is successful!
        </Alert>
      </Snackbar>
    </div>
    </div>:

    <>
      Item Not Found;
    </>

  )
}

export default Item
