import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Paper,
  Avatar,
  InputBase,
  Button,
  IconButton,
  Stack,
  Typography,
  TextField
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { createPost } from "../../redux/action/postActions";
import { useUser } from "../../context/UserContext"; // Récupération de l'utilisateur connecté

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Stocke l'URL de l'image
  const [showImageInput, setShowImageInput] = useState(false); // Affiche le champ URL après un clic
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user: currentUser } = useUser(); // Récupération du user connecté

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  // Fonction pour publier un post
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser._id) {
      console.error("❌ Erreur : Aucun utilisateur connecté.");
      return;
    }

    const newPost = {
      content: message,
      image: imageUrl, // Ajoute l'image au post
      author: currentUser._id,
    };

    dispatch(createPost(newPost)); // Envoi du post à Redux
    setMessage(""); // Réinitialisation du champ message
    setImageUrl(""); // Réinitialisation de l'URL image
    setShowImageInput(false); // Masquer l'input après la soumission
  };

  return (
    <Paper
      sx={{
        borderRadius: "24px",
        padding: "20px",
        backgroundColor: theme.palette.backgroundWhite.default,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Avatar />
          <Box sx={{ flexGrow: 1 }}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: "34px",
                backgroundColor: theme.palette.background.default,
                fontFamily: theme.typography.fontFamily.Montserrat,
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                fullWidth
                placeholder="Partager un message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                minRows={2}
                sx={{
                  fontSize: "14px",
                  fontFamily: theme.typography.fontFamily.Montserrat,
                  "&::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 0.6,
                  },
                }}
              />
            </Paper>

            {/* ✅ Champ pour entrer l'URL de l'image */}
            {showImageInput && (
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Coller l'URL de l'image ici..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                sx={{ mt: 1 }}
              />
            )}

            {/* ✅ Affichage de l'aperçu de l'image si une URL est saisie */}
            {imageUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "12px", mb: 1 }}>
                  Aperçu de l'image :
                </Typography>
                <img src={imageUrl} alt="Aperçu" style={{ maxWidth: "100%", borderRadius: "10px" }} />
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                {/* ✅ Bouton pour ajouter une image via URL */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconButton color="primary" onClick={() => setShowImageInput(!showImageInput)}>
                    <ImageIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "12px" }}>
                    Image
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IconButton color="primary">
                    <VideocamIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "12px" }}>
                    Vidéo
                  </Typography>
                </Box>

                {/* ✅ Emoji Picker */}
                <Box sx={{ position: "relative" }}>
                  <IconButton color="primary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                  {showEmojiPicker && (
                    <Box sx={{ position: "absolute", bottom: "50px", left: 0, zIndex: 100 }}>
                      <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} />
                    </Box>
                  )}
                </Box>
              </Stack>

              <Button variant="publish" type="submit">
                Publier
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default CreatePost;
