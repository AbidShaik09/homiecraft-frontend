import { Container, Skeleton, Snackbar, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderDetails from '../../components/orderdetails/OrderDetails'
import CustomerOrder from '../../components/customerOrder/CustomerOrder'
import { Fullscreen } from '@mui/icons-material'

function Orders() {
    const baseURL = "http://localhost:5265/"
    const [orders, setOrders] = useState([])
    const [loading,setLoading] = useState(false);
    let id = localStorage.getItem("id")
    useEffect(() => {
        setLoading(true);
        axios.get(baseURL + "order/customer/" + id).then(e => {
            const statusOrder = ["Picked Up By Courier", "Accepted", "Delivered"];
            
            var o = e.data.sort((a, b) => {
                return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
            });
            
            setOrders(o);
            console.log(orders);
            setLoading(false);
        }).catch(e =>{
            setLoading(false);
            <Snackbar title='Error occured'/>
        })

    }, [])

    if(loading){
        <Container>
                        <Skeleton
                        sx={{ bgcolor: 'grey.210', borderRadius:"20px", marginBottom:"20px"}}
                        variant="rectangular"
                        width={1100}
                        height={300}
                      />
                      <Skeleton
                        sx={{ bgcolor: 'grey.210', borderRadius:"20px"}}
                        variant="rectangular"
                        width={1100}
                        height={300}
                      />
                      </Container>
    }
    
    return (
        <Container sx={{marginTop:"20px"}}>
            <Container  >
                <Typography  sx={{marginBottom:"20px", fontSize:"30px"}}>
                Orders
                </Typography>
            </Container>
            <Container >

                {
                    orders.length > 0 ?
                        orders.map(order => {
                            return <CustomerOrder order={order }/>
                        }) : 
                        <div>No orders.</div>
                }

            </Container>


        </Container>


    )
}

export default Orders
