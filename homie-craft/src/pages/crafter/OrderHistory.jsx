import { Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../components/button/primary/ButtonPrimary'
import OrderDetails from '../../components/orderdetails/OrderDetails'

function OrderHistory() {
    const baseURL = "http://localhost:5265/"
    const [orders, setOrders] = useState([])
    let id = localStorage.getItem("id")
    useEffect(() => {
        axios.get(baseURL + "order/crafter/" + id).then(e => {
            var o = e.data.sort((a, b) => b.isActive - a.isActive);;
            setOrders(o);
            console.log(orders);

        }
        )

    }, [])
    
    return (
        <Container>
            <Container  >
                <Typography variant='h4'>
                Orders
                </Typography>
            </Container>
            <Container>

                {
                    orders.length > 0 ?
                        orders.map(order => {
                            return <OrderDetails order={order }/>
                        }) : <Container>-No Order History-</Container>
                }

            </Container>


        </Container>


    )
}

export default OrderHistory
