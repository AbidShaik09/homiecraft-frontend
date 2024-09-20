import { Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonSecondary from '../button/secondary/ButtonSecondary'
import axios from 'axios'
import ButtonPrimary from '../button/primary/ButtonPrimary'

function OrderDetails(params) {
    var baseURL = ("http://localhost:5265/")
    const [order,setOrder]=useState( params.order)
    const [isPicked, setIsPicked] = useState(order.status == "Picked Up By Corrier"||order.status == "Delivered")
    const corrierHandler =()=>{
        axios.put(baseURL+"order/transit/"+order.orderID).then(setIsPicked(true))
    }
    return( 
    <Container>
        <Typography sx={{backgroundColor:"#a8dadc",color:"#1d3557",margin:"20px" ,padding: "10px", borderRadius: "3px", border: "1px solid black" }}>
        <div style={ order.isActive ?{ color: "green" }:{ color: "red" }}>
                {order.isActive ? "In Progress" : "Delivered"}</div>
            <div>
                OrderID: {order.orderID}
            </div>
            <div>
                type: {order.type}</div>
            <div>
                status: {order.status == "Active" ? "Accepted" : order.status}</div>
            
            <Container sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                <div>
                    {!isPicked ?"Pick-up From":"Return To"}:
                    <ul>
                        <li>latitude : {order.latitudeFrom}</li>
                        <li>longitude : {order.longitudeFrom}</li>
                        <li>City : {order.cityFrom}</li>
                        <li>State : {order.stateFrom}</li>
                        <li>Pincode: {order.pincodeFrom}</li>
                        {!isPicked ? <li>Expected Pickup: {order.expectedPickup} </li> : <li>Pickup Date: {order.expectedPickup} </li>}
                    </ul>
                    {!isPicked && <ButtonPrimary action={corrierHandler} name="hand to corrier" />}

                </div>
                <div>
                    Shipping To :
                    <ul>
                        <li>latitude : {order.latitudeTo}</li>
                        <li>longitude : {order.longitudeTo}</li>
                        <li>City : {order.cityTo}</li>
                        <li>State : {order.stateTo}</li>
                        <li>Pincode: {order.pincodeTo}</li>
                        <li>Expected Delivery: {order.expectedDelivery} </li>
                    </ul>

                </div>


            </Container>



        </Typography>
    </Container>)

}

export default OrderDetails
