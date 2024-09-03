import './App.css';
import Navbar from './components/navbar/Navbar';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import OrangeTheme from './themes/OrangeTheme';

function App() {
  return (
    <ThemeProvider theme={OrangeTheme}>
      


      
    </ThemeProvider>
  );
}

export default App;
