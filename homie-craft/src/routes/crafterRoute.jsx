import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CrafterHome from "../pages/crafter/CrafterHome";
import React from 'react'
import Navbar from "../components/navbar/Navbar";

function CrafterRoute() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<CrafterHome/>}/>
          <Route path='*' element={<h1>404 Not Found </h1>}/>
        </Routes>

      </Router>
  );
}

export default CrafterRoute

