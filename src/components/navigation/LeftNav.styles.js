import { Box, Button, styled } from '@mui/material';

export const NavContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px',
  backgroundColor: theme.palette.backgroundWhite.default,
  borderTopRightRadius: '24px',
  borderBottomRightRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}));

export const NavItem = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  cursor: 'pointer',
  position: 'relative',
  marginTop: '0px !important',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '80%',
    backgroundColor: active ? theme.palette.secondaryActive.default : 'transparent',
    borderRadius: '0px 0px 2px 2px',
  },

  '& .MuiSvgIcon-root': {
    fontSize: '22px',
    color: active ? theme.palette.secondaryActive.default : theme.palette.text.primary,
  },

  '& .MuiTypography-root': {
    color: active ? theme.palette.secondaryActive.default : theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily.Montserrat,
    fontWeight: 400,
    fontSize: '16px',
  },

  '&:hover .MuiSvgIcon-root, &:hover .MuiTypography-root': {
    color: theme.palette.secondaryActive.default,
  },
}));

// Utilise les styles globaux du MuiButton définis dans theme.js
export const CreatePostButton = styled(Button)(({ theme }) => ({
  width: '100%', 
  borderRadius: '35px !important',
}));
