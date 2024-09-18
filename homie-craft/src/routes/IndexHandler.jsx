import React from 'react'
import CustomerRoute from './customerRoute'
import CrafterRoute from './crafterRoute'
import axios from 'axios'





function IndexHandler() {
    var userType = localStorage.getItem("userType")
    var id = localStorage.getItem("id")
    
    
    if(userType == "customer"){
        return <CustomerRoute/>
    }
    if(userType == "crafter"){
        return <CrafterRoute/>
    }
    else{
        localStorage.removeItem("token")
        localStorage.removeItem("userType")
        if(userType!=null)
        localStorage.removeItem("id")
        return <CustomerRoute/>
    }
}



export default IndexHandler
