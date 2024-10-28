import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import OrangeTheme from './themes/OrangeTheme';
import { lightTheme } from './themes/LightTheme';
import { darkTheme } from './themes/DarkTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <ThemeProvider theme={OrangeTheme}>
    <CssBaseline/>
    <App />
    </ThemeProvider>
    </UserProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
