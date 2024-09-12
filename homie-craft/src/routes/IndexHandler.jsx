import React from 'react'
import CustomerRoute from './customerRoute'
import CrafterRoute from './crafterRoute'





function IndexHandler() {
    var userType = localStorage.getItem("token")
    
    if(userType == "customer"){
        return <CustomerRoute/>
    }
    if(userType == "crafter"){
        return <CrafterRoute/>
    }
    else{
        
        return <CustomerRoute/>
    }
}



export default IndexHandler
