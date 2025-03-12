import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Typography, Avatar, IconButton, InputBase } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

// Barre de navigation
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    width: '100%',
    position: 'fixed',
    top: 0,
    backgroundColor: 'white',
    boxShadow: 'none',
    padding: '0px 20px',
}));

// Toolbar : alignement des éléments
export const StyledToolbar = styled(Toolbar)({
    height: '70px',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-between', // 👈 Répartit les 3 blocs
    maxWidth: '1200px', 
    width: '100%', 
    margin: "0 auto",
});

// Logo
export const StyledLogo = styled(Typography)(({ theme }) => ({
    fontFamily: 'Joti One',
    fontWeight: 400,
    fontSize: '55px',
    color: theme.palette.primary.main,
}));

// Conteneur de la barre de recherche
export const StyledSearchContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '24px',
    padding: '8px 15px',
    width: "400px",  // Taille initiale
    transition: 'width 0.3s ease-in-out',  
    marginLeft: '35px',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: "10px",
    '& .MuiSvgIcon-root': {
        fontSize: "24px",
        color: theme.palette.lightText.main,
    },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily.Montserrat,
    fontWeight: 400,
    fontSize: '16px',
    color: theme.palette.lightText.main,
    width: "100%",
    '&::placeholder': {
        color: theme.palette.lightText.main,
    },
}));

// Section Droite : Dark Mode + Auth + Profil
export const StyledRightSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1, 
    justifyContent: 'flex-end',
});

// Mode Sombre
export const DarkModeButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

// Authentification
export const AuthSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    fontFamily: theme.typography.fontFamily.Montserrat,
    fontWeight: 400,
    fontSize: '16px',
    color: theme.palette.primary.main,
    transition: 'color 0.3s ease-in-out',
    '&:hover': {
        color: theme.palette.secondaryActive.default,
    },
}));

// Profil utilisateur
export const ProfileSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});

export const ProfilePic = styled(Avatar)({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid #CCCCCE',
});

export const Username = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily.JotiOne,
    fontWeight: 400,
    fontSize: '16px',
    color: '#000000',
}));

export const StyledChevron = styled(KeyboardArrowDownIcon)({
    fontSize: '18px',
    color: '#000000',
});
