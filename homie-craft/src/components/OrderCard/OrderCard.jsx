import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material"
import React, { useState } from "react"
import ButtonSecondary from "../button/secondary/ButtonSecondary"
import ButtonPrimary from "../button/primary/ButtonPrimary"
import axios from "axios"
import RequestModal from "../modal/requestModal/RequestModal"
const OrderCard = (params) => {
    let baseUrl = 'http://localhost:5265/orderrequest/'
    const [showButtons, setShowButtons] = useState(true);
    const [btnMessage, setBtnMessage] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    
    const acceptOrderHandler = () => {

        axios.post(baseUrl + 'approve/' +params.orderId,{"message":btnMessage.toString()
    
    } ).then(e => {  
           setIsHidden(true);
           console.log("resultant :")
           const x= e.data
           params.setOrders((orders)=>({...(orders),x}));
           
           setShowButtons(false) })
    }
    const rejectOrderHandler = () => {
    }

    return (
        <>
        {!isHidden && 
            <Card  sx={{  backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white',minWidth:'330px', width: '100%' }}>

                <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'center', sm: 'end' } }}>
                    <Container>
                            <Typography gutterBottom variant="h5" sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis',}} >
                                {params.craftName}
                            </Typography>
                            <Typography sx={{
                                display: 'flex', flexDirection: 'column'
                            }}  >
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                <div>
                                    <div>
                                        Type: <span style={{ color: 'orange' , fontSize: '0.8rem' }}>{params.type.toUpperCase()}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div>
                                        Price: <span style={{ color: 'green' }}>  ₹{params.price} </span>
                                    </div>
                                    <div>
                                        PickUp Date: <span style={{ fontSize: '0.8rem', color: 'green'  }}>{params.expectedPickup} </span>
                                    </div>
                                
                                </div>
                                
                                </div>
                                
                                <div>
                                <div>
                                        Payment Type: <span style={{ fontSize: '0.8rem', color: 'green'  }}>{params.paymentType} </span>
                                    </div>

                                </div>


                            </Typography>
                        

                    </Container>




                </CardContent>

            </Card>
            }



        </>

    )
}


export default OrderCard