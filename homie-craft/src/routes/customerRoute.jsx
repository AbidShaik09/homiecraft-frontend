import React, { useEffect } from 'react'
import Home from '../pages/customer/Home';
import CustomerProfile from '../pages/customer/CustomerProfile/CustomerProfile';
import Wishlist from '../pages/customer/Wishlist';
import Orders from '../pages/customer/Orders';
import Categories from '../pages/customer/Categories';
import Item from '../pages/customer/Item';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from '../pages/customer/Login';
import Signup from '../pages/customer/Signin';
import CrafterRoute from './crafterRoute';
import Auth from '../pages/auth/auth';
import ItemNotFound from '../pages/itemNotFound';
import CustomerOrderRequests from '../pages/customer/CustomerOrderRequests';
function CustomerRoute() {
  useEffect(()=>{
    let userType = localStorage.getItem("userType");
    if(userType=="crafter"){
      return(<CrafterRoute/>)
    }
  },[])
    return (
          <Routes>
            {/* <Route path='/indexHandler' element= {<IndexHandler/>}/> */}
            <Route path='/profile'element={<CustomerProfile/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path="/ItemNotFound" element={<ItemNotFound/>} />
            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/orderRequests' element={<CustomerOrderRequests/>}/>
            <Route path='/categories/:id' element={<Categories/>}/>
            <Route path='/item/:id' element={<Item/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='*' element={<h1>404 Not Found </h1>}/>
          </Routes>
  
    );
  }

export default CustomerRoute
