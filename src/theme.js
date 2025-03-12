// theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (isDarkMode) => {
  const backgroundColor = isDarkMode ? '#121212' : '#F2F2F2';
  const paperBackground = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#0B0E13';
  const extraColor = isDarkMode ? '#FFFFFF' : '#A9A9A9';

  return createTheme({
    palette: { 
      mode: isDarkMode ? "dark" : "light",
      primary: { main: '#0B0E13' },
      secondary: { main: '#D7E9FB' },
      secondaryActive: { default: '#56A1EC' },
      background: { default: backgroundColor },
      backgroundWhite: { default: paperBackground },
      text: { primary: textColor },
      lightText: { main: '#CCCCCE' },
      lightExtra: {main: extraColor},
      blueIpssi: { main: '#160ED3' },
    },
    typography: {
      fontFamily: {
        JotiOne: 'Joti one',
        Montserrat: 'Montserrat',
      },
      h1: {
        fontSize: '48px',
        fontWeight: 700,
        '@media (max-width: 900px)': { fontSize: '40px' },
        '@media (max-width: 600px)': { fontSize: '32px' },
      },
      h2: {
        fontSize: '36px',
        fontWeight: 600,
        '@media (max-width: 900px)': { fontSize: '30px' },
        '@media (max-width: 600px)': { fontSize: '26px' },
      },
      h3: {
        fontSize: '28px',
        fontWeight: 500,
        '@media (max-width: 900px)': { fontSize: '24px' },
        '@media (max-width: 600px)': { fontSize: '20px' },
      },
      p: {
        fontSize: '18px',
        fontWeight: 400,
        fontFamily: 'Montserrat',
        lineHeight: '1.6',
        color: paperBackground,
        '@media (max-width: 900px)': { fontSize: '16px' },
        '@media (max-width: 600px)': { fontSize: '14px' },
      },
      body1: {
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'Montserrat',
        lineHeight: '1.6',
        color: textColor,
        '@media (max-width: 900px)': { fontSize: '16px' },
        '@media (max-width: 600px)': { fontSize: '14px' },
      },
      a: {
        fontSize: '16px',
        fontWeight: 600,
        textDecoration: 'none',
        color: paperBackground,
        '&:hover': {
          textDecoration: 'none',
          color: '#56A1EC',
        },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '10px 20px',
            fontSize: '16px',
            transition: 'all 0.3s ease-in-out',
            backgroundColor: isDarkMode ? '#D7E9FB' : '#D7E9FB',
            color: isDarkMode ? '#0B0E13' : '#0B0E13',
            fontFamily: 'Montserrat',
            '&:hover': {
              backgroundColor: '#56A1EC',
              color: '#0B0E13',
            },
            '&.Mui-disabled': {
              backgroundColor: '#CCCCCC',
              color: '#666666',
            },
          },
          follow: {
            minWidth: '50px',
            height: '24px',
            borderRadius: '12px',
            backgroundColor: isDarkMode ? '#D7E9FB' : '#0B0E13',
            '&:hover': { 
              backgroundColor: isDarkMode ? '#56A1EC' : '#56A1EC' 
            },
            textTransform: 'none',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '10px',
            color: isDarkMode ? '#0B0E13' : '#FFFFFF',
            padding: '5px 10px',
          }, 
          publish: {
            borderRadius: '34px',
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '8px 16px',
            fontSize: '12px',
            transition: 'all 0.3s ease-in-out',
            backgroundColor: isDarkMode ? '#D7E9FB' : '#D7E9FB',
            color: isDarkMode ? '#0B0E13' : '#0B0E13',
            fontFamily: 'Montserrat',
            '&:hover': {
              backgroundColor: '#56A1EC',
              color: '#0B0E13',
            },
            '&.Mui-disabled': {
              backgroundColor: '#CCCCCC',
              color: '#666666',
            },
          }
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: paperBackground,
            padding: '16px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%'
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: '40px 20px 40px 20px',
            '@media (max-width: 900px)': { padding: '30px 20px 30px 20px' },
            '@media (max-width: 600px)': { padding: '20px' },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: 'Montserrat',
            fontSize: '12px',
            fontWeight: 500,
            textDecoration: 'none',
            color: textColor,
            display: 'flex', 
            alignItems: 'center',
            '&:hover': {
              textDecoration: 'none',
              color: '#56A1EC',
            },
          },
        },
      },
    },
  });
};
