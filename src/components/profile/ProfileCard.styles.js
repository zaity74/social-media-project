import { Box, Avatar, Typography, styled } from "@mui/material";

export const ProfileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundWhite.default,
  borderBottom: `4px solid ${theme.palette.secondary.main}`,
  borderRadius: "0px 16px 16px 0px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
}));

// Nouveau conteneur pour aligner l'avatar et le texte sur une ligne
export const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  justifyContent: "center", 
  position: "relative",
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '80%',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0px 0px 2px 2px',
  },
}));

// Conteneur pour le texte à côté de l'image
export const ProfileInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const ProfilePicture = styled(Avatar)({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "2px solid white",
});

export const Username = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.JotiOne,
  fontWeight: 400,
  fontSize: "16px",
  color: theme.palette.text.primary,
}));

export const Handle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.Montserrat,
  fontWeight: 400,
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));

export const StatsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  paddingTop: "10px",
});

export const StatBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StatValue = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.Montserrat,
  fontWeight: 600,
  fontSize: "12px",
  color: theme.palette.text.primary,
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.Montserrat,
  fontWeight: 400,
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));
