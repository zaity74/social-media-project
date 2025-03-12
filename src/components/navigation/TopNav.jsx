import { useState } from 'react';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';

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
} from './TopNav.styles';

const TopNav = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <StyledAppBar>
      <StyledToolbar>

        {/* Section Gauche : Logo */}
        <StyledLogo>Y</StyledLogo>

        {/* Section Centre : Barre de recherche */}
        <StyledSearchContainer >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher"
            inputProps={{ 'aria-label': 'search' }}
          />
        </StyledSearchContainer>

        {/* Section Droite : Mode sombre + Connexion + Profil */}
        <StyledRightSection>
          <DarkModeButton onClick={toggleDarkMode}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </DarkModeButton>

          <AuthSection>
            <StyledLink to="/login">Connexion</StyledLink>
            <span>|</span>
            <StyledLink to="/register">S'inscrire</StyledLink>
          </AuthSection>

          <ProfileSection>
            <ProfilePic />
            <Username>Username</Username>
            <StyledChevron />
          </ProfileSection>
        </StyledRightSection>

      </StyledToolbar>
    </StyledAppBar>
  );
};

export default TopNav;
