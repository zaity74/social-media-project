import { Box, Typography, useTheme } from '@mui/material';
import LeftNav from '../navigation/LeftNav';
import ProfileCard from '../profile/ProfileCard';
import ActivityList from '../activity/ActivityList';
import SuggestionList from '../activity/SuggestionList';
import { useDarkMode } from '../../context/DarkModeContext';
import Tags from '../Tags/Tags';

const MainLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        padding: '20px 0px',
        position: 'relative'
      }}
    >
      {/* Conteneur centralisé */}
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: '1200px', 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '240px 1fr',
            lg: '240px 1fr 320px'
          },
          gap: { xs: 1, md: 3 },
          pt: 9,
          pb: 4,
          px: { xs: 1, md: 2 },
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Sidebar Gauche */}
        <Box 
          sx={{ 
            display: { xs: 'none', lg: 'flex' }, 
            flexDirection: 'column',
            gap: '35px',
            padding: "0px 20px",
            
            /* 🔥 Ajout pour le comportement Sticky */
            position: 'sticky',
            top: '20px',
            alignSelf: 'start', // Permet de ne pas dépasser son parent
          }}
        >
          <LeftNav />
          <ProfileCard />
          <Tags />
        </Box>

        {/* Contenu Principal */}
        <Box 
          component="main"
          sx={{
            bgcolor: 'transparent',
            width: '100%',
            maxWidth: '650px'
          }}
        >
          {children}
        </Box>

        {/* Sidebar Droite */}
        <Box 
          component="aside"
          sx={{
            display: { xs: 'none', lg: 'flex' }, 
            flexDirection: 'column',
            gap: '35px',
            padding: "0px 20px",
            position: 'relative',
            alignSelf: 'start', 
          }}
        >
          <ActivityList />
          <SuggestionList />
          <Typography
          sx={{
            padding: '0px 20px 0px 20px',
          }}>
          Politique de confidentialité   Politique de 
          cookies   @2025YGroup
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout;
