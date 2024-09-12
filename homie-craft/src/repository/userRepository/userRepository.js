import { Alert } from '@mui/material'
import axios from 'axios'
import React from 'react'
var baseUrl = "http://localhost:5265/user"
const getUser= async()=>{
    var res= await axios.get(baseUrl+'/7670858952')
    return res.data
}
const updateUser = async(userData) =>{
    console.log("userData Before Update");
    console.log(userData)
    var res = await axios.put(baseUrl+"/"+userData.UserId,userData);
}
const addUser = async(userData) =>{
    var res = await axios.post(userData);
}
export {getUser,updateUser}
