import { createTheme,ThemeProvider } from '@mui/material/styles';

// Import fonts from Google Fonts
import '@fontsource/roboto'; // Defaults to weight 400
/*
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
 
};
*/
const OrangeTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#61cdf9',
    },
    secondary: {
      main: '#949494',
    },
  },
});



export default OrangeTheme


