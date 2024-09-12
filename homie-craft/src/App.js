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
function App() {
  return (
    <ThemeProvider theme={OrangeTheme}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/profile'element={<CustomerProfile/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/categories/:id' element={<Categories/>}/>
          <Route path='/item/:id' element={<Item/>}/>
          <Route path='*' element={<h1>404 Not Found </h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
