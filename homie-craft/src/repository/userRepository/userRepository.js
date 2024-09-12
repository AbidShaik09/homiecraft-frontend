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
    var res = await axios.put(baseUrl+"/"+userData.userId,userData);
}
const addUser = async(userData) =>{
    var res = await axios.post(userData);
}
export {getUser,updateUser}

/*
{
    "userId": 1,
    "name": "shaik Abid Hussain",
    "mobile": "7670858952",
    "password": "1234",
    "profilePicURL": "https://wallpapers.com/images/hd/cool-profile-picture-paper-bag-head-4co57dtwk64fb7lv.jpg",
    "houseNumber": "12/7/122",
    "city": "hyd",
    "state": "telangana",
    "pinCode": "500017"
}

*/ 
