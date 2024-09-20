import { Box, Container, Typography } from '@mui/material'
import React, { Component } from 'react'

function Comment(params) {
    var c = params.comment
    return (
        <Container sx={{display:"flex", flexDirection:"row"}}>
            <Container sx={{width:"100px"}}>
            <Box component="img" sx={{height: 50,width: 50,maxHeight: { xs: 70, md: 100 },maxWidth: { xs: 70, md: 100 }}} alt={c.userId} src={c.userPic}/>
            
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
