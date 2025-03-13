import { styled } from '@mui/material/styles';
import { Paper, Box, Button, Typography, Avatar } from '@mui/material';

export const HeaderContainer = styled(Paper)(({ isDarkMode }) => ({
  width: '100%',
  borderRadius: '16px',
  margin: '0 auto',
  position: 'relative'
}));

export const BannerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '120px',
  backgroundColor: theme.palette.background.default,
  position: 'relative', 
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: "space-between",
  padding: "0px 12px",
}));

export const ProfilePictureWrapper = styled(Box)({
  // position: 'absolute',
  // bottom: '-40px',
  // left: '20px',
  // zIndex: 2
  marginBottom: -40,
});

export const ProfilePicture = styled(Avatar)({
  width: '90px',
  height: '90px',
  border: '4px solid #FFFFFF',
  borderRadius: '60px'
});

export const EditProfileButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  borderRadius: '20px',
  padding: '8px 16px',
  textTransform: 'none',
  fontFamily: 'Montserrat',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.secondaryActive.default,
  }
}));

export const ContentContainer = styled(Box)({
  padding: '40px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
});

export const UserInfoContainer = styled(Box)({
  display: 'flex',
  gap: '24px'
});

export const NameContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});

export const Username = styled(Typography)(({ theme }) => ({
  fontFamily: 'Joti One',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '100%',
  color: theme.palette.primary.main,
}));

export const Handle = styled(Typography)({
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '100%',
  color: '#666666'
});

export const Bio = styled(Typography)({
  flex: 1,
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '150%',
  color: '#000000'
});

export const TabsContainer = styled(Box)({
  display: 'flex',
  gap: '24px',
  marginTop: '24px'
});

export const Tab = styled(Typography)(({ active }) => ({
  fontFamily: 'Montserrat',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '100%',
  color: '#000000',
  padding: '8px 0',
  cursor: 'pointer',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: '#56A1EC',
    opacity: active ? 1 : 0
  }
}));