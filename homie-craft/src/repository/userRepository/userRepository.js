import { Alert } from '@mui/material'
import axios from 'axios'
import React from 'react'
var baseUrl = "http://localhost:3003/user"
const getUser= async()=>{
    var res= await axios.get(baseUrl)
    return res.data
}
const updateUser = async(userData) =>{
    console.log("userData Before Update");
    console.log(userData)
    var res = await axios.put(baseUrl,userData);
}
const addUser = async(userData) =>{
    var res = await axios.post(userData);
}
export {getUser,updateUser}
