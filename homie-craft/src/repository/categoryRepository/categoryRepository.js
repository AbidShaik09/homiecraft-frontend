
import React from 'react'
import axios from 'axios'

var baseUrl = 'http://localhost:3003/categories'
var getCategories = ()=>{
    return axios.get(baseUrl).then(response => response.data)
}

var postCategories = (category) => {
    return axios.post(baseUrl,category)
}

var getCategory = (id)=>{
    return axios.get(baseUrl+"/"+id).then(response => response.data)
}

export {getCategories,postCategories,getCategory}