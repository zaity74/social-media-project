import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Stack, Button, Link } from '@mui/material';
import { NavContainer, NavItem, CreatePostButton } from './LeftNav.styles';
import { useLocation } from 'react-router-dom'; 
import { useUser } from '../../context/UserContext'; // Import de useUser()
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Badge } from '@mui/material';
import { getUnreadNotificationCount } from '../../redux/action/notificationAction';

const LeftNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useUser(); // Récupère l'utilisateur connecté

  // State 
  const { unreadCount } = useSelector((state) => state.userNotification);

  // Construire dynamiquement l'URL du profil en fonction de l'utilisateur connecté
  const profileLink = user?._id ? `/profil/${user._id}` : "/profil";

  // Page load effects 
  useEffect(() => {
    if (user?._id) {
      dispatch(getUnreadNotificationCount(user._id));
    }
  }, [dispatch, user]);

  // Fonction pour déterminer si un lien est actif
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/"; 
    return location.pathname.startsWith(path); 
  };

  return (
    <NavContainer>
      <Stack spacing={2} display="flex" flexDirection="column" gap="20px">
        
        <NavItem active={isActive('/')}>
          <GridViewIcon />
          <Link href="/" underline="none">
            <Typography>Accueil</Typography>
          </Link>
        </NavItem>

        {/* Redirection dynamique vers le profil du user */}
        <NavItem active={isActive('/profil')}>
          <PersonIcon />
          <Link href={profileLink} underline="none">
            <Typography>Profil</Typography>
          </Link>
        </NavItem>

        <NavItem active={isActive('/notifications')}>
          <Badge badgeContent={unreadCount > 0 ? unreadCount : null} color="error">
            <NotificationsIcon />
          </Badge>
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
      <CreatePostButton
        variant="contained"
        component={RouterLink}
        to="/#create-post"
      >
        Créer un post
      </CreatePostButton>
    </NavContainer>
  );
};

export default LeftNav;
