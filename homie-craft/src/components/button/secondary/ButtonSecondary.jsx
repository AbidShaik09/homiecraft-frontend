import React from 'react'
import { Button } from '@mui/material'
function ButtonSecondary(params) {
    return (
        
        <Button onClick={params.action}  variant="outlined">{params.name}</Button>
    )
}

export default ButtonSecondary
