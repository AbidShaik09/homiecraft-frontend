import { Container, Typography, Divider, Skeleton, Stack } from '@mui/material';
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
    const navigate = useNavigate()

    const corrierHandler = () => {
        axios.put(`${baseURL}order/delivered/${order.orderID}`).then(() => setIsDelivered(true));
    };

    const capitalize = {
        textTransform: 'capitalize'
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
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            margin: "30px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
            flexDirection:{xs:"column",md:"row"},padding:{xs:0, sm:1,md:2,lg:3,xl:4}
        }}>
            {craft.length > 0 ? (
               <Container onClick={itemRedirect} sx={{cursor:"pointer",  display:"flex",flexDirection:"column"}}> <img  style={{ width: 220, height: 170, marginRight: "20px" }} src={craft[0].images[0]} alt={craft[0].name} />
                {craft.length>0 ? (<Container sx={{marginLeft:"30px",marginTop:"5px"}}>
                    <Typography variant='h6' style={capitalize}>{craft[0].name}</Typography>
                    <Typography variant='h6'>{'₹ '+craft[0].price}</Typography>
                </Container>):
                <>
                    <Stack spacing={1} width={'100vw'} height={'100vh'}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={60} />
                        <Skeleton variant="rounded" width={210} height={60} />
                    </Stack>
                </>}
                </Container>
            ):
            <>
                <Stack spacing={1} width={'100vw'} height={'100vh'}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
            </>}

            <Divider orientation="vertical" flexItem sx={{ margin: "0 20px" }} />

            <Container sx={{ flexGrow: 1 }}>
                {craft.length > 0 && (
                    <>
                        <Typography variant='h6' style={capitalize}>Order Summary: </Typography>
                        <Typography>
                            Status: {order.status === "Accepted" ? <span style={{ color: "orange" }}><b>Accepted</b></span> : <span style={{ color: "green" }}><b>Delivered</b></span>}
                        </Typography>
                        <Typography style={capitalize}>Quantity: {order.quantity}</Typography>
                        <Typography style={capitalize}>Total Price: {'₹ '+craft[0].price*order.quantity}</Typography>
                        <Typography style={capitalize}>Ordered on: {format(new Date(order.createdDate), 'PP')}</Typography>
                        <Typography>
                            Delivery Type: {order.type}
                        </Typography>
                        <Typography style={capitalize}>{!isDelivered ? "Expected Delivery" : "Delivered on"}: {format(new Date(order.expectedDelivery), 'PP')}</Typography>
                    </>
                )}
            </Container>

            <Divider orientation="vertical" flexItem sx={{ margin: "0 20px" }} />

            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "0" }}>
                <Typography variant='h6'>Shipping Status</Typography>
                <Container sx={{ marginTop: "5px" }}> 
                    <Typography>
                        {!isDelivered ? "Shipping To:" : "Shipped To:"}
                    </Typography>
                    <ul>
                        <li>City: {order.cityTo}</li>
                        <li>State: {order.stateTo}</li>
                        <li>Pincode: {order.pincodeTo}</li>
                    </ul>
                </Container>

                <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
                    {!isDelivered && isPicked && <ButtonPrimary action={corrierHandler} name="Mark As Received" />}
                </Container>
            </Container>
        </Container>
    );
}

export default CustomerOrder;
