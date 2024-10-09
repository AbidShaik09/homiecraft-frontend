import React, { useContext, useState } from 'react'
import CustomerRoute from './customerRoute'
import CrafterRoute from './crafterRoute'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import Login from '../pages/customer/Login'
import { useNavigate } from 'react-router-dom'
import { useHomieCraftContext } from '../context/HomieCraftContext'

function IndexHandler() {
  
    const navigate = useNavigate()
    let userType = localStorage.getItem("userType")
    const {token,setToken} = useHomieCraftContext()
    console.log(token)
    
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
