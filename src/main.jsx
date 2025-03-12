import React from 'react';
import { Provider } from "react-redux";
import configureAppStore from './redux/store';
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
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={configureAppStore()}>
      <DarkModeProvider>
        <AppWrapper />
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);