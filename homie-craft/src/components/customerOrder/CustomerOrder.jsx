import { Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonSecondary from '../button/secondary/ButtonSecondary'
import axios from 'axios'
import ButtonPrimary from '../button/primary/ButtonPrimary'

function CustomerOrder(params) {
    var baseURL = ("http://localhost:5265/")
    const [order,setOrder]=useState( params.order)
    const [isDelivered, setIsDelivered] = useState(order.status == "Delivered")
    const [isPicked, setIsPicked] = useState(order.status == "Picked Up By Corrier")
    const corrierHandler =()=>{
        axios.put(baseURL+"order/delivered/"+order.orderID).then(setIsDelivered(true))
    }
    return( 
    <Container>
        <Typography sx={{backgroundColor:"#a8dadc",color:"#1d3557",margin:"20px" ,padding: "10px", borderRadius: "3px", border: "1px solid black" }}>
        <div style={ order.isActive ?{ fontWeight:'bold',color: "chocolate" }:{ fontWeight:'bold',color :'green' }}>
                {order.isActive ? "Ordered" : "Delivered"}</div>
            <div>
                OrderID: {order.orderID}
            </div>
            <div>
                type: {order.type}</div>
            <div>
                status: {order.status == "Active" ? "Accepted" : order.status}</div>
            
            <Container sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <div>
                    {"Return To"}:
                    <ul>
                        <li>latitude : {order.latitudeFrom}</li>
                        <li>longitude : {order.longitudeFrom}</li>
                        <li>City : {order.cityFrom}</li>
                        <li>State : {order.stateFrom}</li>
                        <li>Pincode: {order.pincodeFrom}</li>
                        { <li>Expected Pickup: {order.expectedPickup} </li>}
                    </ul>
                    
                </div>
                <div>
                {!isDelivered ?"Shipping To":"Shipped To"}::
                    <ul>
                        <li>latitude : {order.latitudeTo}</li>
                        <li>longitude : {order.longitudeTo}</li>
                        <li>City : {order.cityTo}</li>
                        <li>State : {order.stateTo}</li>
                        <li>Pincode: {order.pincodeTo}</li>
                        <li>{!isDelivered?"Expected Delivery":"Delevered "}: {order.expectedDelivery} </li>
                    </ul>
                    {!isDelivered && isPicked && <ButtonPrimary action={corrierHandler} name="Mark As Recieved" />}


                </div>


            </Container>



        </Typography>
    </Container>)

}

export default CustomerOrder
