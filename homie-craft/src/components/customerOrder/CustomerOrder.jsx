import { Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonSecondary from '../button/secondary/ButtonSecondary'
import axios from 'axios'
import ButtonPrimary from '../button/primary/ButtonPrimary'
import { format } from 'date-fns'

function CustomerOrder(params) {
    var baseURL = ("http://localhost:5265/")
    const [order,setOrder]=useState( params.order)
    const [isDelivered, setIsDelivered] = useState(order.status == "Delivered")
    const [isPicked, setIsPicked] = useState(order.status == "Picked Up By Corrier")
    const corrierHandler =()=>{
        axios.put(baseURL+"order/delivered/"+order.orderID).then(setIsDelivered(true))
    }
    return( 
        <Container sx={{backgroundColor:"#a8dadc",color:"#1d3557",margin:"20px",padding:"10px", borderRadius: "10px", border: "2px solid black" }}>
        <Typography variant='h6' style={ order.isActive ?{ fontWeight:'bold',color: "chocolate" }:{ fontWeight:'bold',color :'green' }}>
                {order.isActive && !isDelivered ? "Ordered" : ""}</Typography>
            <Typography>
                OrderID: {order.orderID}
            </Typography>
            <Typography>
                Delivery Type: {order.type}
            </Typography>
            <Typography>
                Status: {order.status == "Active" ? "Accepted" : order.status}
            </Typography>
            
            <Container sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", marginTop:"10px" }}>
                <Container>
                    <Typography>Return to:</Typography>
                    <ul>
                        <li>Latitude : {order.latitudeFrom}</li>
                        <li>Longitude : {order.longitudeFrom}</li>
                        <li>City : {order.cityFrom}</li>
                        <li>State : {order.stateFrom}</li>
                        <li>Pincode: {order.pincodeFrom}</li>
                        <li>Expected Pickup: {format(new Date(order.expectedPickup),'PP')} </li>
                    </ul>
                    
                </Container>
                <Container>
                {!isDelivered ?"Shipping To":"Shipped To"}:
                    <ul>
                        <li>Latitude : {order.latitudeTo}</li>
                        <li>Longitude : {order.longitudeTo}</li>
                        <li>City : {order.cityTo}</li>
                        <li>State : {order.stateTo}</li>
                        <li>Pincode: {order.pincodeTo}</li>
                        <li>{!isDelivered?"Expected Delivery":"Delevered "}: {format(new Date(order.expectedDelivery),'PP') } </li>
                    </ul>
                    {!isDelivered && isPicked && <ButtonPrimary action={corrierHandler} name="Mark As Recieved" />}


                </Container>


            </Container>



        </Container>
        )

}

export default CustomerOrder
