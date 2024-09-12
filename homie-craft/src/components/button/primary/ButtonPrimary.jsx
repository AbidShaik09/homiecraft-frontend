import React from 'react'
import { Button } from '@mui/material'
function ButtonPrimary(params) {
  return (
    <Button variant="contained" onClick={params.action}>{params.name}</Button>

    
  )
}

export default ButtonPrimary
