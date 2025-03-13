import { Box, Typography, Avatar, Button, useTheme } from "@mui/material";

const SoloItem = ({ avatar, username, description, showFollowButton, onFollowClick, onUnfollowClick, isFollowing }) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px", 
        width: "100%", 
        padding: "10px 0",
      }}
    >
      {/* Avatar */}
      <Avatar 
        src={avatar} 
        sx={{ width: 35, height: 35 }}
      />

      {/* Texte (Nom + Action) */}
      <Box sx={{ flexGrow: 1 }}> 
        <Typography 
          sx={{
            fontFamily: "Joti One",
            fontWeight: 400,
            fontSize: "12px",
            color: theme.palette.text.primary,
          }}
        >
          {username}
        </Typography>
        {description && (
          <Typography 
            sx={{
              fontFamily: theme.typography.fontFamily.Montserrat,
              fontWeight: 400,
              fontSize: "12px",
              color: theme.palette.text.secondary, 
              mt: "2px",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Bouton Suivre/Désabonner */}
      {showFollowButton && (
        <Button 
          variant="follow"
          onClick={isFollowing ? onUnfollowClick : onFollowClick}
          sx={{
            fontSize: "12px",
            textTransform: "none",
            backgroundColor: isFollowing ? "#D7E9FB" : "#0B0E13",
            "&:hover": {
              backgroundColor: isFollowing ? "transparent" : "#D7E9FB",
            },
          }}
        >
          {isFollowing ? "Suivi" : "Suivre"}

        </Button>
      )}
    </Box>
  );
};

export default SoloItem;
