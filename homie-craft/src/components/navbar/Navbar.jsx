import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import OrangeTheme from '../../themes/OrangeTheme';
import axios from 'axios';
import ShowSearch from '../ShowSearch';
import { Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useHomieCraftContext } from '../../context/HomieCraftContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  
  const {token, setToken,userType,setUserType,id,setId} = useHomieCraftContext()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [showSearch,setShowSearch] = React.useState(false)
  console.log("userType "+userType)
  const isCustomer = userType == "customer";
  const isCrafter = userType == 'crafter';
  console.log("isCustomer: "+isCustomer)
  console.log("isCrafter: "+isCrafter)
  const [search,setSearch] = React.useState()
  const [data,setData] = React.useState()
  const handleSearch=(e)=>{
    setSearch(e.target.value)
    if(search!=""){
    axios.get(`http://localhost:5265/search/${search}`).then((res)=>{
      setData(res.data)
      setShowSearch(true)
      console.log(JSON.stringify(data))
  }).catch((err)=>{console.log(err)})}
  else{setShowSearch(false)}
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('id');
    localStorage.removeItem('customerId');
    localStorage.removeItem('crafterId');
    localStorage.removeItem('token');
    setId(null)
    setUserType(null)
    setToken(null)
    
    handleMenuClose();
    navigate('/')
  };

  const handleToggleUserType = () => {
    if(userType=='customer'){
      setUserType('crafter')
      setId(localStorage.getItem('crafterId'))
      setUserType("crafter")
      navigate("/")
    }
    else{
      setUserType('customer')
      setId(localStorage.getItem('customerId'))
      setUserType("customer")
      navigate("/")
    }
  };
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {

    setAlignment(newAlignment);
  };
  

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: OrangeTheme.palette.primary.main,
        },
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {navigate('/profile'); handleMenuClose();}}>View Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate('/profile')}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="false"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>View Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    if (isCrafter) {
      navigate(`/`);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            type="button"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/')}
          >
            Homie Craft
          </Typography>
          
          {isCustomer ? <>
            
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            
            <StyledInputBase
              
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e)=>handleSearch(e)}
            />
            
            {showSearch && <ShowSearch suggestions={data} onSelect={() => {setShowSearch(false); setSearch('');}}/>}
          </Search></>:""}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: '20px' } }}>
            {userType!=null && userType!="" && (
              <>
             
            <Button 
            onClick={handleToggleUserType} 
            variant="outlined" 
            sx={{ margin: '0 5px', color:"white", border: '2px solid #4b2e2e', 
              backgroundColor: '#8b4513', 
              '&:hover': {
                backgroundColor: '#a0522d', }}}
          >
            Switch to {userType=="customer" ? 'Crafter' : 'Customer'}
          </Button>
                {userType=="customer" && <IconButton
                  size="large"
                  edge="end"
                  aria-label="orders"
                  aria-controls={menuId}
                  aria-haspopup="false"
                  onClick={() => navigate('/orders')}
                  color="inherit"
                >
                  <LocalShippingIcon />
                </IconButton>}
              </>
            )}
            {isCustomer || isCrafter ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              // <MenuItem onClick={() => navigate('/login')}>
              //   <Typography variant="h6" noWrap component="div">
              //     Login
              //   </Typography>
              // </MenuItem>
              <MenuItem onClick={() => window.location.href = "https://homiecraft.b2clogin.com/homiecraft.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_HomieCraftSignupSignIn&client_id=7fda49b9-5fc0-4022-961d-3b2920ee7717&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=openid&response_type=code&prompt=login"
              }>
  <Typography variant="h6" noWrap component="div">
    Login/Signup
  </Typography>
</MenuItem>

            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Navbar;
