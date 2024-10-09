import React, { useContext, useEffect, useState } from 'react'
import CustomerRoute from './customerRoute'
import CrafterRoute from './crafterRoute'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import Login from '../pages/customer/Login'
import { useNavigate } from 'react-router-dom'
import { useHomieCraftContext } from '../context/HomieCraftContext'
import { Typography } from '@mui/material'

function IndexHandler() {
    const [isLoading,setIsLoading] = useState(true)
    const {token, setToken,userType,setUserType,id,setId} = useHomieCraftContext()
    const navigate = useNavigate()
    useEffect(()=>{
        let ltoken = localStorage.getItem("token")
        let lid = localStorage.getItem("id")
        let luserType = localStorage.getItem("userType")
        if(ltoken!=null){
            setToken(ltoken)
            setId(lid)
            setUserType("customer")
        }
        setIsLoading(false)

    },[])
    
    if(isLoading){
        return(<Typography>
            Loading...
        </Typography>)
    }
    else{
        
    if(userType == "customer"){
        return <CustomerRoute />
    }
    if(userType == "crafter"){
        return <CrafterRoute/>
    }
    else{
        return <CustomerRoute />
    }
    }

}



export default IndexHandler
