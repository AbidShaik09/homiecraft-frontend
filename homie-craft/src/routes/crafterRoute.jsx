import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CrafterHome from "../pages/crafter/CrafterHome";
import React from 'react'
import Navbar from "../components/navbar/Navbar";
import AddCraft from "../pages/crafter/AddCraft";

import CrafterProfile from "../pages/crafter/CrafterProfile";
import { Login } from "@mui/icons-material";
import IndexHandler from "./IndexHandler";
import OrderHistory from "../pages/crafter/OrderHistory";
import CrafterOrderRequests from "../pages/crafter/CrafterOrderRequests";
function CrafterRoute() {
  return (
      
        <Routes>
          
        {/* <Route path='/indexHandler' element= {<IndexHandler/>}/> */}
          <Route path='/' element={<CrafterHome/>}/>
          <Route path='/orders' element={<OrderHistory/>}/>
          <Route path='add-craft/:crafterId' element={<AddCraft/>}/>
          <Route path="/profile" element= {<CrafterProfile/>}/>
          
          <Route path='/orderRequests' element={<CrafterOrderRequests/>}/>
          <Route path='*' element={<h1>404 Not Found </h1>}/>
        </Routes>

  );
}

export default CrafterRoute

