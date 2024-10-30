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
import { useHomieCraftContext } from '../../context/HomieCraftContext';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ClickAwayListener } from '@mui/material';
import { useTheme } from '@emotion/react';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 5,
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
  
const theme = useTheme()
  const {token, setToken,userType,setUserType,id,setId} = useHomieCraftContext()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchOpen = Boolean(searchAnchorEl);

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
  }).catch((err)=>{console.log(err)})}
  else{setShowSearch(false)}
  }
  const handleClickAway=()=>{
    setShowSearch(false)
    setSearch('')
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
    handleMenuClose()
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
          backgroundColor: OrangeTheme.palette.primary.text,
        },
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > 
      <MenuItem onClick={handleToggleUserType} >Switch to {userType=="customer" ? 'Crafter' : 'Customer'}</MenuItem>
      <MenuItem onClick={() => {navigate('/profile'); handleMenuClose();}}>View Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      
      id={mobileMenuId}
      
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
       {userType!=null && userType!="" && (
              <><MenuItem onClick={handleToggleUserType}>
              <p className='align-self-center'>Switch To {userType=="customer" ? 'Crafter' : 'Customer'} </p>
            </MenuItem></>
       )
       }
       
        {isCustomer || isCrafter ? (
    <>
      <MenuItem onClick={() => navigate('/profile')}>
        <p className='align-self-center'>View Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <p>Logout</p>
      </MenuItem>
    </>)
    :<>
    <MenuItem onClick={() => window.location.href = "https://homiecraft.b2clogin.com/homiecraft.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_HomieCraftSignupSignIn&client_id=7fda49b9-5fc0-4022-961d-3b2920ee7717&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=openid&response_type=code&prompt=login"
              }>
  <Typography variant="h6" noWrap component="div">
    Login/Signup
  </Typography>
</MenuItem>
    </>
        }
    </Menu>
  );

  React.useEffect(() => {
    if (isCrafter) {
      navigate(`/`);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 ,backgroundColor: theme.palette.paper}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            type="button"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/')}
          >
            Homie Craft
          </Typography>
          
          {!isCrafter? <>
          <ClickAwayListener onClickAway={handleClickAway}>
          <Search >
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
          </Search></ClickAwayListener></>:""}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: '20px' } }}>
            {userType!=null && userType!="" && (
              <>
             
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
                {userType=="crafter" && <IconButton
                  size="large"
                  edge="end"
                  aria-label="orders"
                  aria-controls={menuId}
                  aria-haspopup="false"
                  onClick={() => navigate('/orderHistory')}
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
              <MenuItem onClick={() => window.location.href = "https://homiecraft.b2clogin.com/homiecraft.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_HomieCraftSignupSignIn&client_id=7fda49b9-5fc0-4022-961d-3b2920ee7717&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=openid&response_type=code&prompt=login"
              }>
                <Typography variant="h6" noWrap component="div">
                  Login
                </Typography>
              </MenuItem>

            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Navbar;
