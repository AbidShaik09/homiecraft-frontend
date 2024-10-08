import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonSecondary from '../../components/button/secondary/ButtonSecondary'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import ItemGallery from '../../components/gallerySection/ItemGallery'
import Button from '@mui/material/Button';
import axios from 'axios'
import { Alert, Container, Fab, Snackbar, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Comment from '../../components/comments/Comment'

function Item() {
   
    let {id} = useParams()
    const [craft,setCraft] = useState({})
    const [price,setPrice] = useState()
    const [crafter,setCrafter] = useState({})
    const [open, setOpen] = useState(false)
    const [comments,setComments] = useState([])
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    let userType = localStorage.getItem("userType")
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
      setQuantity(0)
      setPrice(0)
      setUserMessage()
    };
    useEffect(()=>{
      try{
        axios.get(`http://localhost:5265/crafts/${id}`).then((res)=>{
        console.log(res.data)
        setCraft(res.data)
        setPrice(res.data[0].price)
        axios.get(`http://localhost:5265/crafter/${res.data[0].crafterId}`).then((res)=>{
          setCrafter(res.data)

        }).catch(e=>console.log(e))
      })
      }
      catch{
        console.log("Error Occured")
      }

      try{
        
      axios.get('http://localhost:5122/Comment/'+id).then(res=>
      {
        var x= res.data
        setComments(x)
      })
      }
      catch{
        console.log("Error Occured")
      }
      

    },[])
    const [quantity,setQuantity] = useState(0)
    const [userMessage,setUserMessage] = useState()
    const [purchaseMode,setPurchaseMode] = useState()
    const quantityHandler=(newQuanity)=>{
      if(newQuanity>=0 && newQuanity<=craft[0].quantity)
        setQuantity(newQuanity)
    }

    const orderRequestHandler=()=>{
      if(quantity>0){
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
        setQuantity(0)
        setPrice(0)
        setUserMessage()
      }
        else{

        }
    }
    const [openSnack, setSnackOpen] = React.useState(false);
    const [newComment,setNewComment] = useState("");
    const handleAddComment= async()=>{
      try{
        var userId = localStorage.getItem("id")
        var user =await axios.get("http://localhost:5265/user/"+userId).then(
          res=>{
            var x = res.data;
            return x;
          },
          axios.get('http://localhost:5122/Comment/'+id).then(res=>
          {
            var x= res.data
            setComments(x)
          })
          
        )
        var nc={
          id:"random",
          userId: userId,
          craftId: id,
          comment: newComment,
          userPic: user.profilePicURL
        }
      axios.post('http://localhost:5122/Comment/',nc).then(res=>
        {
          var x= res.data
          setNewComment("")
          var c = comments
          axios.get('http://localhost:5122/Comment/'+id).then(res=>
            {
              var x= res.data
              setComments(x)
            })
        })
        }
        catch{
          console.log("Error Occured")
        }

    }
  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };
  return (craft.length>0?<>
    <Container sx={{ marginTop:5}}>
      <Container  sx={{display:'flex',flexDirection:{xs:"column",md:"row"},padding:{xs:0, sm:1,md:2,lg:3,xl:4},alignItems:"center"}}>
        <Container sx={{ maxWidth:{xs:"100%", lg:"50%"}}}><ItemGallery images={craft[0].images}/>
        </Container>
        <Container sx={{maxWidth:{xs:"100%", lg:"50%"},display:"flex",flexDirection:"column",alignItems:"center"}} >
          
        <h3>Purchase Options</h3>
          <Container sx={{gap : "20px",display:'flex',flexDirection:{ xs:"column",sm:"row",lg:"row",xl:"row"},alignItems:"center",justifyContent:"space-around"}}>
            <ButtonPrimary style={{width:"100%"}} name='Home Delivery' action={handleClickOpenHome}/>
            {craft[0].pickUpFromCrafter==true?<ButtonPrimary style={{width:"100%"}} name='Pick from Crafter' action={handleClickOpenPick}/>:<Typography>in person not available</Typography>}
          </Container>
        </Container>
        
      </Container>
      <Container sx={{display:"flex",flexDirection:{xs:"column",md:"row"}}}>
      <Container>
          <h2>{craft[0].name}</h2>
          <div class="d-flex gap-5">
            <h4>{'₹ '+craft[0].price}</h4>
          </div>
          <h6 class="mt-2">{craft[0].description}</h6>
        </Container>


        <Container>
            <h3>Crafter Details:</h3>
        <Container sx={{display:'flex',flexDirection:{xs:'column-reverse' , sm:'row', md:"row"}, boxShadow:'0px 0px 10px 0px()',padding:'10px'}}>
          
          
          <Container class="d-flex gap-3">
            <div>
              <div class="d-flex">Crafter Name:<h5><b>{crafter.name}</b></h5></div>
              <div class="d-flex">City:<h5><b>{crafter.city}</b></h5></div>
              <div class="d-flex">View Location</div>
            </div>
            
          
          </Container>
          
          <Container sx={{alignSelf:"center"}}><img style={{width:'100px', height:'100px',maxHeight:'125px',maxWidth:'125px',objectFit:'cover',borderRadius:'50%',padding:'1px'}} src={crafter.profilePicUrl} alt="" class="w-10 h-10"/>
          </Container>
        </Container>
        </Container>
        


      </Container>

      
      <Container>
        <Container>
          <Container >
            <Typography variant='h5' >
              
            Comments
            </Typography>
          </Container>
            {comments.length>0 && comments.map(comment=>{
              return <Comment setComments={setComments} comment={comment}/>
            }) }
        </Container>
        <Container sx={{margin:"40px 20px"}}>
            {
              userType == "customer" && <Container>
                
                <Typography variant='h6'>Add Comment</Typography>
                <Container sx={{display:'flex'}}>

                  
                <input placeholder='comment' value={newComment} onChange={e=>setNewComment(e.target.value)} style={{width:"80%"}}/>
                <ButtonSecondary action={handleAddComment} name={'Comment'} />
                </Container>

              </Container>
            }
        </Container>

        </Container>
      
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
              <h5 class="mt-3 ms-3">Payable Amount:{craft[0].price * quantity}</h5>

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
    </Container></>:

    <>
      <Stack spacing={1} width={'100vw'} height={'100vh'}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
    </>

  )
}

export default Item
