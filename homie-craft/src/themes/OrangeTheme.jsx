import { createTheme,ThemeProvider } from '@mui/material/styles';

const OrangeTheme = createTheme({
  palette: {
    primary: {
      main: '#ff9900',
      contrastText: '#0d1b2a',
      secondary:'#e0e1dd'
    },
    secondary: {
      main: '#e0e1dd',
    },
  },
});



export default OrangeTheme


