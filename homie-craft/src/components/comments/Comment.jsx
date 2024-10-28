import { Box, Container, Typography } from '@mui/material'
import React, { Component } from 'react'

function Comment(params) {
    var c = params.comment
    return (
        <Container sx={{display:"flex", flexDirection:"row"}}>
            <Container sx={{width:"100px"}}>
            <Box component="img" sx={{height: 50,width: 50,maxHeight: { xs: 70, md: 100 },maxWidth: { xs: 70, md: 100 }}} alt={"https://th.bing.com/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"} src={c.userPic}/>
            
            </Container>
            
            
            <Container>
            <Typography variant='h6'>
                User{c.userId}
            </Typography>
            <Typography sx={{marginLeft:"10px"}}>
                {c.comment}
            </Typography>

            </Container>
            
        </Container>
    )
}

export default Comment
