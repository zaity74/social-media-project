import { Typography } from '@mui/material';
import LeftNav from '../navigation/LeftNav';
import ProfileCard from '../profile/ProfileCard';
import ActivityList from '../activity/ActivityList';
import SuggestionList from '../activity/SuggestionList';
import { useDarkMode } from '../../context/DarkModeContext';
import Tags from '../Tags/Tags';
import {
  MainContainer,
  GridLayout,
  LeftSidebar,
  MainContent,
  RightSidebar
} from './MainLayout.styles';

const MainLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <MainContainer isDarkMode={isDarkMode}>
      <GridLayout>
        {/* Sidebar Gauche */}
        <LeftSidebar>
          <LeftNav />
          <ProfileCard />
          <Tags />
        </LeftSidebar>

        {/* Contenu Principal */}
        <MainContent component="main">
          {children}
        </MainContent>

        {/* Sidebar Droite */}
        <RightSidebar component="aside">
          <ActivityList />
          <SuggestionList />
          <Typography className="footer-text">
            Politique de confidentialité • Politique de cookies • © 2025 YGroup
          </Typography>
        </RightSidebar>
      </GridLayout>
    </MainContainer>
  );
};

export default MainLayout;
