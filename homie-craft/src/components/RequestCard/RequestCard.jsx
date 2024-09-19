import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material"
import React, { useState } from "react"
import ButtonSecondary from "../button/secondary/ButtonSecondary"
import ButtonPrimary from "../button/primary/ButtonPrimary"
import axios from "axios"
import RequestModal from "../modal/requestModal/RequestModal"
const RequsetCard = (params) => {
    let baseUrl = 'http://localhost:5265/'
    const [showButtons, setShowButtons] = useState(true);
    const [btnMessage, setBtnMessage] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    
    const acceptOrderHandler = () => {

        axios.post(baseUrl + 'orderrequest/approve/' +params.orderId,{"message":btnMessage.toString()
    
    } ).then(e => {  
           setIsHidden(true);
           axios.get(baseUrl + 'order/crafter/'+params.crafterId).then(x=>
                
           params.setOrders(x.data)
           )
           
           
           setShowButtons(false) })
    }
    const rejectOrderHandler = () => {
        axios.post(baseUrl + 'orderrequest/reject/' + params.orderId, {"message":btnMessage.toString()}).then(e => { setIsHidden(true); setShowButtons(false) })
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
                                    <div>Qty: <span style={{ color: 'green' }}>{params.quantity}</span></div>
                                    <div>
                                        Type: <span style={{ color: 'orange' , fontSize: '0.8rem' }}>{params.purchaseMode.toUpperCase()}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div>
                                        Price: <span style={{ color: 'green' }}>  ₹{params.price} </span>
                                    </div>
                                    <div>
                                        Req Date: <span style={{ fontSize: '0.8rem', color: 'green'  }}>{params.createdDate} </span>
                                    </div>
                                
                                </div>
                                
                                </div>
                                
                                <div>
                                    {showButtons ?
                                        <div style={{display:'flex',justifyContent:'space-evenly', gap: '5px' }}>
                                            
                                            <RequestModal  message={btnMessage} setMessage ={setBtnMessage} action={acceptOrderHandler} name='Accept Order'/>
                                            <RequestModal  message={btnMessage} setMessage = {setBtnMessage} action={rejectOrderHandler} name='Reject Order'/>
                                            
                                        </div>


                                        : <p>{btnMessage}</p>}

                                </div>


                            </Typography>
                        

                    </Container>




                </CardContent>

            </Card>
            }



        </>

    )
}


export default RequsetCard