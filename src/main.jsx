// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import { getTheme } from './theme';
import './index.css';

const AppWrapper = () => {
  const { isDarkMode } = useDarkMode(); // ✅ Appel correct du contexte

  return (
    <ThemeProvider theme={getTheme(isDarkMode)}> 
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <AppWrapper />
    </DarkModeProvider>
  </React.StrictMode>
);
