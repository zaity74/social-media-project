import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // ✅ Import du thème
import { useDarkMode } from '../../context/DarkModeContext';
import backgroundLight from '../../assets/BackgroundDark4.jpg';
import backgroundDark from '../../assets/BackgroundDark4.jpg';

const BackgroundLayout = () => {
  const { isDarkMode } = useDarkMode();
  const theme = useTheme(); // ✅ Récupération du thème

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0, 
        minWidth: '100vw', 
        height: '50%',
        backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`, // ✅ Dynamisation de l'image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        opacity: 1,
        zIndex: 0,
      }}
    >
      <Typography 
        sx={{ 
          fontSize: 300, 
          fontWeight: 600, 
          color: theme.palette.text.primary, // ✅ Dynamisation de la couleur selon le thème
          fontFamily: theme.typography.fontFamily.JotiOne, // ✅ Utilisation du font du thème
          position: 'absolute', 
          bottom: '-50px', 
          right: '120px', 
          opacity: 1
        }}
      >
        Y
      </Typography>
    </Box>
  );
}

export default BackgroundLayout;
