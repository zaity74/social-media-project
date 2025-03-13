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
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { createPost } from "../../redux/action/postActions";
import { useUser } from "../../context/UserContext";

const CreatePost = ({ onPostCreated }) => {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user: currentUser } = useUser();

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser._id) {
      console.error("❌ Erreur : Aucun utilisateur connecté.");
      return;
    }

    const newPost = {
      content: message,
      image: imageUrl, // Ajoute l'image si renseignée
      author: currentUser._id,
    };

    try {
      const response = await dispatch(createPost(newPost)); // Envoi Redux
      onPostCreated(response.payload); // Mise à jour locale immédiate
    } catch (error) {
      console.error("Erreur lors de la création du post", error);
    }

    setMessage("");
    setImageUrl("");
    setShowImageInput(false);
  };

  return (
    <Paper sx={{ borderRadius: "24px", padding: "20px", backgroundColor: theme.palette.backgroundWhite.default }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Avatar />
          <Box sx={{ flexGrow: 1 }}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: "34px",
                backgroundColor: theme.palette.background.default,
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
