import { useState } from "react";
import { AppBar, Menu, MenuItem } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../../context/UserContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "@mui/material";

// Import des styles
import { 
  StyledToolbar,
  StyledLogo,
  StyledSearchContainer,
  SearchIconWrapper,
  StyledInputBase,
  StyledRightSection,
  DarkModeButton,
  AuthSection,
  StyledLink,
  ProfileSection,
  ProfilePic,
  Username,
  StyledChevron,
  StyledAppBar
} from "./TopNav.styles";

const TopNav = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isLogin, logoutUser } = useUser() || {}; // Récupération des infos utilisateur
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ✅ Déconnexion
  const handleLogout = () => {
    logoutUser();
    handleMenuClose();
  };

  return (
    <StyledAppBar>
      <StyledToolbar>

        <Link href="/">
          <StyledLogo>Y</StyledLogo>
        </Link>

        <StyledSearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Rechercher" inputProps={{ "aria-label": "search" }} />
        </StyledSearchContainer>

        <StyledRightSection>
          <DarkModeButton onClick={toggleDarkMode}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </DarkModeButton>

          {!isLogin ? (
            <AuthSection>
              <StyledLink to="/login">Connexion</StyledLink>
              <span>|</span>
              <StyledLink to="/register">S'inscrire</StyledLink>
            </AuthSection>
          ) : (
            <ProfileSection onClick={handleMenuOpen}>
              <ProfilePic />
              <Username>{user && user.username}</Username> {/* Affichage du nom */}
              <StyledChevron />
            </ProfileSection>
          )}

          <Menu
            sx={{ maxWidth: 200 }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Éditer le profil</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>Déconnexion</MenuItem>
          </Menu>
        </StyledRightSection>

      </StyledToolbar>
    </StyledAppBar>
  );
};

export default TopNav;
