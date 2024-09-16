import { createTheme,ThemeProvider } from '@mui/material/styles';

// Import fonts from Google Fonts
import '@fontsource/roboto'; // Defaults to weight 400

const OrangeTheme = createTheme({
  palette: {
    primary: {
      main: '#ff9900',
      contrastText: '#0d1b2a',
    },
    secondary: {
      main: '#e0e1dd',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d1b2a',
      secondary: '#4f5d75',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'Merriweather, serif',
    },
    h2: {
      fontFamily: 'Merriweather, serif',
    },
    h3: {
      fontFamily: 'Merriweather, serif',
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  },
});



export default OrangeTheme


