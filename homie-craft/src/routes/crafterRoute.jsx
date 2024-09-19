import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CrafterHome from "../pages/crafter/CrafterHome";
import React from 'react'
import Navbar from "../components/navbar/Navbar";
import AddCraft from "../pages/crafter/AddCraft";

import CrafterProfile from "../pages/crafter/CrafterProfile";
import { Login } from "@mui/icons-material";
function CrafterRoute() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<CrafterHome/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='add-craft/:crafterId' element={<AddCraft/>}/>
          <Route path="/profile" element= {<CrafterProfile/>}/>
          <Route path='*' element={<h1>404 Not Found </h1>}/>
        </Routes>

      </Router>
  );
}

export default CrafterRoute

