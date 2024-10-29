import { Container, Skeleton, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderDetails from '../../components/orderdetails/OrderDetails'
import CustomerOrder from '../../components/customerOrder/CustomerOrder'
import { Fullscreen } from '@mui/icons-material'

function Orders() {
    const baseURL = "http://localhost:5265/"
    const [orders, setOrders] = useState([])
    let id = localStorage.getItem("id")
    useEffect(() => {
        axios.get(baseURL + "order/customer/" + id).then(e => {
            var o = e.data.sort((a, b) => b.isActive - a.isActive);
            setOrders(o);
            console.log(orders);

        }
        )

    }, [])
    
    return (
        <Container sx={{marginTop:"20px"}}>
            <Container  >
                <Typography variant='h4' sx={{marginLeft:"20px"}}>
                Orders
                </Typography>
            </Container>
            <Container >

                {
                    orders.length > 0 ?
                        orders.map(order => {
                            return <CustomerOrder order={order }/>
                        }) : 
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

            </Container>


        </Container>


    )
}

export default Orders
