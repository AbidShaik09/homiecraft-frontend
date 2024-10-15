import { createTheme,ThemeProvider } from '@mui/material/styles';

// Import fonts from Google Fonts
import '@fontsource/roboto'; // Defaults to weight 400

const OrangeTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9900',
    },
    secondary: {
      main: '#e0e1dd',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#0d1b2a',
    },
  },
  typography: {
    h6: {
      fontFamily: 'Poppins',
    },
    fontFamily: 'Poppins',
  },
});



export default OrangeTheme


