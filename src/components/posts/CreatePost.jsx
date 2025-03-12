import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Avatar, 
  InputBase,
  Button,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import { useTheme } from '@mui/material/styles';

const CreatePost = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const theme = useTheme();

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post content:', message);
    setMessage('');
  };

  return (
    <Paper sx={{ 
      borderRadius: '24px',
      padding: '20px',
      backgroundColor: theme.palette.backgroundWhite.default
    }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Avatar />
          <Box sx={{ flexGrow: 1 }}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: '34px',
                backgroundColor: theme.palette.background.default, 
                fontFamily: theme.typography.fontFamily.Montserrat,
                display: 'flex',
                alignItems: 'center',
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
                  fontSize: '14px',
                  fontFamily: theme.typography.fontFamily.Montserrat,
                  // paddingY: '12px', // Centre verticalement le texte
                  // paddingLeft: '12px', // Assure 20px d'espacement à gauche
                  '&::placeholder': { 
                    color: theme.palette.text.secondary,
                    opacity: 0.6, 
                  }
                }}
              />
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconButton color="primary">
                    <ImageIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>
                    Image
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconButton color="primary">
                    <VideocamIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '12px' }}>
                    Vidéo
                  </Typography>
                </Box>

                {/* Emoji Picker */}
                <Box sx={{ position: 'relative' }}>
                  <IconButton color="primary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                  {showEmojiPicker && (
                    <Box sx={{ position: 'absolute', bottom: '50px', left: 0, zIndex: 100 }}>
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
