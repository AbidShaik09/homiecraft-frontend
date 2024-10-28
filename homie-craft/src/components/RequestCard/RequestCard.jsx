import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import ButtonSecondary from "../button/secondary/ButtonSecondary"
import ButtonPrimary from "../button/primary/ButtonPrimary"
import axios from "axios"
import RequestModal from "../modal/requestModal/RequestModal"
const RequsetCard = (params) => {
    let baseUrl = 'http://localhost:5265/'
    const [showButtons, setShowButtons] = useState(true);
    const [btnMessage, setBtnMessage] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    let token = localStorage.getItem("token");
    const [craftQty,setCraftQty] = useState(0);
    
    const [btnClicked,setBtnClicked] = useState(false);
    useEffect(() => {
        axios.get(baseUrl + "crafts/" + params.craftId).then(res => {
            console.log("Qty: "+res.data[0].quantity);console.log(res.data);setCraftQty(res.data[0].quantity);
        })
    },[]);
  var crafterId = localStorage.getItem("id")
    const acceptOrderHandler = () => {
        setBtnClicked(true)
        axios.post(baseUrl + 'orderrequest/approve/' +params.orderId,{"message":btnMessage.toString()
    
    },{
        headers: {
          'Authorization': `Bearer ${token}`
        }} ).then(e => {  
           setIsHidden(true);
           axios.get(baseUrl + 'order/crafter/'+params.crafterId).then(x=>{

            axios.get("http://localhost:5265/Order/crafter/" + crafterId,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }}).then(res => {
                let x= res.data
                params.setOrders(x);
                params.setActiveOrders(x.filter(o=>o.isActive==true))
              })
              axios.get(baseUrl + "crafts/crafter/" + crafterId).then(res => {
                params.setCrafts(res.data);
             })
            
           }
                
           
           )
           
           
           setShowButtons(false) })
    }
    const rejectOrderHandler = () => {
        setBtnClicked(true)
        axios.post(baseUrl + 'orderrequest/reject/' + params.orderId, {"message":btnMessage.toString()},{
            headers: {
              'Authorization': `Bearer ${token}`
            }}).then(e => { setIsHidden(true); setShowButtons(false) })
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
                                            
                                            {params.quantity<=craftQty ? <RequestModal btnClicked ={btnClicked}   message={btnMessage} setMessage ={setBtnMessage} action={acceptOrderHandler} name='Accept Order'/>:"Update Stock"}
                                            <RequestModal btnClicked ={btnClicked}   message={btnMessage} setMessage = {setBtnMessage} action={rejectOrderHandler} name='Reject Order'/>
                                            
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