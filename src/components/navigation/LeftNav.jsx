import { Box, Typography, Stack, Button, Link } from '@mui/material';
import { NavContainer, NavItem, CreatePostButton } from './LeftNav.styles';
import { useLocation } from 'react-router-dom'; // ✅ Import du hook useLocation
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const LeftNav = () => {
  const location = useLocation(); // ✅ Permet de récupérer l'URL actuelle

  // ✅ Fonction pour déterminer si un lien est actif
  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      <Stack spacing={2} display="flex" flexDirection="column" gap="20px">
        
        <NavItem active={isActive('/')}>
          <GridViewIcon />
          <Link href="/" underline="none">
            <Typography>Accueil</Typography>
          </Link>
        </NavItem>

        <NavItem active={isActive('/profil')}>
          <PersonIcon />
          <Link href="/profil" underline="none">
            <Typography>Profil</Typography>
          </Link>
        </NavItem>

        <NavItem active={isActive('/notifications')}>
          <NotificationsIcon />
          <Link href="/notifications" underline="none">
            <Typography>Notifications</Typography>
          </Link>
        </NavItem>

        <NavItem active={isActive('/enregistrements')}>
          <BookmarkIcon />
          <Link href="/enregistrements" underline="none">
            <Typography>Enregistrements</Typography>
          </Link>
        </NavItem>

        <NavItem active={isActive('/interactions')}>
          <PeopleIcon />
          <Link href="/interactions" underline="none">
            <Typography>Interactions</Typography>
          </Link>
        </NavItem>

        <NavItem active={isActive('/plus')}>
          <MoreHorizIcon />
          <Link href="/plus" underline="none">
            <Typography>Plus</Typography>
          </Link>
        </NavItem>
      </Stack>

      {/* Bouton pour créer un post */}
      <CreatePostButton variant="contained">
        Créer un post
      </CreatePostButton>
    </NavContainer>
  );
};

export default LeftNav;
