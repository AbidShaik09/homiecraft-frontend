import { Container, Typography, Divider, Skeleton, Stack, Alert, Snackbar, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonPrimary from '../button/primary/ButtonPrimary';
import axios from 'axios';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';

function CustomerOrder(params) {
    const baseURL = "http://localhost:5265/";
    const [order, setOrder] = useState(params.order);
    const [isDelivered, setIsDelivered] = useState(order.status === "Delivered");
    const [isPicked, setIsPicked] = useState(order.status === "Picked Up By Courier");
    const [craft, setCraft] = useState([]);
    const [openSnack, setSnackOpen] = React.useState(false);
    const navigate = useNavigate()
    
    const corrierHandler = () => {
        axios.put(`${baseURL}order/delivered/${order.orderID}`).then(() => {setIsDelivered(true); setSnackOpen(true); });
    };

    const capitalize = {
        textTransform: 'capitalize'
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
      };

    const itemRedirect=()=>{
        navigate(`/item/${craft[0].id}`)
    }

    useEffect(() => {
        axios.get(`${baseURL}crafts/${order.craftId}`).then((res) => {
            setCraft(res.data);
            console.log(JSON.stringify(order));
        });
    }, [order.craftId]);

    return (
        <Container sx={{
            display: "flex",
            alignItems: "start",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            marginBottom: "30px",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
            flexDirection:{xs:"column",md:"row"},padding:{xs:0, sm:1,md:2,lg:3,xl:4}
        }}>
            {craft.length > 0 ? (
               <Container 
                    onClick={itemRedirect} 
                    sx={{cursor:"pointer",  
                        display:"flex",
                        alignItems:"center",                   
                    flexDirection:"column",                    
                    }}> 
                    <img    style={{ width: 290, height: 190 }} 
                            src={craft[0].images[0]} alt={craft[0].name} 
                    />
                {
                    craft.length>0 ? 
                        <Box sx={{marginTop:"5px",display:"flex",alignItems:"center",flexDirection:"column"}}>
                            <Typography variant='h6' style={capitalize}>{craft[0].name}
                            </Typography>
                            <Typography variant='h7'>{'₹ '+craft[0].price}</Typography>
                        </Box>
                        :
                        <>
                            <Stack spacing={1} width={'100vw'} height={'100vh'}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={210} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>
                        </>
                }
                </Container>
            ):
            <>
                <Stack spacing={1} width={'100vw'} height={'100vh'}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
            </>
            }

            <Divider orientation="vertical" flexItem sx={{ margin: "0 20px" }} />

            <Box sx={{ flexGrow: 1 ,alignItems:"flex-start", paddingX:"30px", width:"750px"}}>
                {craft.length > 0 && (
                <>
                <Typography variant='h6' style={capitalize} sx={{marginLeft:"0px",marginBottom:"15px"}}>Order Summary</Typography>
                <Box>

                
                <Box sx={{display:"flex",gap:"15px"}}>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly",height:"175px"}}>
                        <Typography>Status</Typography>
                        <Typography >Quantity</Typography>
                        <Typography >Total Price</Typography>
                        <Typography>Ordered On</Typography>
                        <Typography>{!isDelivered ? "Expected By" : "Delivered On"}</Typography>
                    </Box >
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly",height:"175px"}}>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly",height:"175px"}}>
                        <Typography>{order.status === "Accepted" ? <span style={{ color: "orange" }}><b>Accepted</b></span> : order.status === "Picked Up By Courier" && !isDelivered ? <span style={{ color: "orange" }}><b>Out for delivery</b></span> : <span style={{ color: "green" }}><b>Delivered</b></span>}</Typography>
                        <Typography>{order.quantity}</Typography>
                        <Typography>{'₹ '+craft[0].price*order.quantity}</Typography>
                        <Typography>{format(new Date(order.createdDate), 'PP')}</Typography>
                        <Typography>{format(new Date(order.expectedDelivery), 'PP')}</Typography>
                    </Box>
                </Box>
                {order.status === "Picked Up By Courier" && false ? <ButtonPrimary action={corrierHandler} name="Mark As Received" />:<></>}
                </Box>
                
                </>
                )}
            </Box>

            <Divider orientation="vertical" flexItem sx={{ margin: "0 20px" }} />
            <Box sx={{ flexGrow: 1 ,alignItems:"flex-start",paddingX:"30px", width:"750px"}}>
                {craft.length > 0 && (
                <>
                <Typography variant='h6' style={capitalize} sx={{marginLeft:"0px",marginBottom:"15px"}}>Shipping Address</Typography>
                <Box>
                <Box sx={{display:"flex",gap:"15px"}}>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly",height:"175px"}}>
                        <Typography>H.No</Typography>
                        <Typography >City</Typography>
                        <Typography >State</Typography>
                        <Typography>Pin Code</Typography>
                        <Typography>Mobile</Typography>
                    </Box >
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly",height:"175px"}}>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                        <Typography>:</Typography>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-evenly",height:"175px"}}>
                        <Typography>{order.houseTo}</Typography>
                        <Typography>{order.cityTo}</Typography>
                        <Typography>{order.stateTo}</Typography>
                        <Typography>{order.pincodeTo}</Typography>
                        <Typography>{order.phoneTo}</Typography>
                        
                    </Box>
                    </Box>
                {order.status === "Picked Up By Courier" && !isDelivered ? <ButtonPrimary action={corrierHandler} name="Mark As Received" />:<></>}
                    
                </Box>
                </>
                )}
            </Box>
            <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert
                onClose={handleSnackClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                Your order is completed!
                </Alert>
            </Snackbar>
            </div>
        </Container>
    );
}

export default CustomerOrder;