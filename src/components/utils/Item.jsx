import { Box, Typography, Avatar, Button, useTheme, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; 

const SoloItem = ({
  _id,
  avatar,
  username,
  description,
  postImage,       // ✅ nouveau champ image du post
  postContent,     // (optionnel) pour usage futur
  showFollowButton,
  onFollowClick,
  onUnfollowClick,
  isFollowing
}) => {
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
      {/* Avatar utilisateur (celui qui a liké/commenté) */}
      <Avatar 
        src={avatar} 
        sx={{ width: 35, height: 35 }}
      />

      {/* Infos texte + image post */}
      <Box sx={{ flexGrow: 1 }}>
        <Link component={RouterLink} to={`/profil/${_id}`} underline="none">
          <Typography 
            sx={{
              fontFamily: "Joti One",
              fontWeight: 400,
              fontSize: "12px",
              color: theme.palette.text.primary,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {username}
          </Typography>
        </Link>

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

        {/* ✅ Afficher l'image du post liké (miniature) */}
        {postImage && (
          <Box mt={1}>
            <img 
              src={postImage}
              alt="post"
              style={{
                width: "100%",
                maxWidth: "65px",
                height: "65px",
                border: `1px solid ${theme.palette.divider}`,
                objectFit: 'cover',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Bouton suivre (pas affiché ici) */}
      {showFollowButton && (
        <Button 
          variant="follow"
          onClick={isFollowing ? onUnfollowClick : onFollowClick}
          sx={{
            fontSize: "12px",
            textTransform: "none",
            color: 'white',
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
