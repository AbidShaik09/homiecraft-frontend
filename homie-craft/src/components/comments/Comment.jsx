import { Box, Container, Typography } from '@mui/material'
import React, { Component } from 'react'

function Comment(params) {
    var c = params.comment
    return (
        <div style={{display:"flex", flexDirection:"row", margin:"15px 0px", padding:"0px"}}>
            <Container sx={{width:"100px", margin:"0px"}}>
            <Box component="img" sx={{mariginTop:"4px", display: "flex", height: "30",width: "30", borderRadius:"100%", maxHeight: { xs: 30, md: 30 },maxWidth: { xs: 30, md: 30 }}} alt={"https://th.bing.com/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"} src={"https://th.bing.com/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"}/>

            </Container>
            {/* <div style={{width:"100px", display:"flex", alignItems:"initial"}}> */}
            {/* <img alt={"https://th.bing.com/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"} src={"https://th.bing.com/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"} width={"100px"} height={"100"}></img> */}
            {/* </div> */}
            
            
            <div style={{display: "flex", flexDirection:"column", alignItems: "initial", justifyContent:"center"}}>
            <Typography sx={{fontSize: "18px"}}>
                User{c.userId}
            </Typography>
            <Typography sx={{ fontSize: "15px", color: "gray" }}>
                {c.comment}
            </Typography>

            </div>
            
        </div>
    )
}

export default Comment
