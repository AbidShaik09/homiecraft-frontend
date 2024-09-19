import React, { useContext, useState } from 'react'
import CustomerRoute from './customerRoute'
import CrafterRoute from './crafterRoute'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import Login from '../pages/customer/Login'
import { useNavigate } from 'react-router-dom'





function IndexHandler() {
  
    const navigate = useNavigate()
    let userType = localStorage.getItem("userType")
    
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



export default IndexHandler
