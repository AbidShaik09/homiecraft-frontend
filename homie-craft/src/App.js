import './App.css';
import Navbar from './components/navbar/Navbar';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import OrangeTheme from './themes/OrangeTheme';
import Home from './pages/customer/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CustomerProfile from './pages/customer/CustomerProfile/CustomerProfile';
import Categories from './pages/customer/Categories';
import Item from './pages/customer/Item';
import Wishlist from './pages/customer/Wishlist';
import Orders from './pages/customer/Orders'
import Login from './pages/customer/Login';
import Signin from './pages/customer/Signin';
import IndexHandler from './routes/IndexHandler';
import { CssBaseline } from '@mui/material';
import { HomieCraftContextProvider } from './context/HomieCraftContext';

function App() {
  return (
    <HomieCraftContextProvider>
    <Router>
      <Navbar/>
      <Routes>
        
      {/* <Route path='/indexHandler' element= {<IndexHandler/>}/> */}
        
        <Route path='/signup' element={<Signin/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path='*' element={<IndexHandler/>}/>
                       
      </Routes>

    </Router>
    </HomieCraftContextProvider> 
);
}

export default App;
