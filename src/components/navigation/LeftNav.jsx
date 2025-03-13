import { Box, Typography, Stack, Button, Link } from '@mui/material';
import { NavContainer, NavItem, CreatePostButton } from './LeftNav.styles';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const LeftNav = () => {
  return (
    <NavContainer>
      <Stack spacing={2} display="flex" flexDirection="column" gap="20px">
        <NavItem active>
          <GridViewIcon />
          <Link href='/'><Typography>Accueil</Typography></Link>
        </NavItem>

        <NavItem>
          <PersonIcon />
          <Link href='/profil'><Typography>Profil</Typography></Link>
        </NavItem>

        <NavItem>
          <NotificationsIcon />
          <Typography>Notifications</Typography>
        </NavItem>

        <NavItem>
          <BookmarkIcon />
          <Typography>Enregistrements</Typography>
        </NavItem>

        <NavItem>
          <PeopleIcon />
          <Typography>Interactions</Typography>
        </NavItem>

        <NavItem>
          <MoreHorizIcon />
          <Typography>Plus</Typography>
        </NavItem>
      </Stack>

      {/* Bouton utilisant MuiButton root */}
      <CreatePostButton variant="contained">
        Créer un post
      </CreatePostButton>
    </NavContainer>
  );
};

export default LeftNav;
