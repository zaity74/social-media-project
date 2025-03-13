import { useState } from "react";
import {
  Avatar,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  InputBase,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SendIcon from "@mui/icons-material/Send";
import {
  PostContainer,
  PostHeader,
  PostHeaderInfo,
  PostActions,
  CommentSection,
  CommentInput,
  CommentsList,
  CommentBox
} from "./PostCard.styles";

const PostCard = ({ post }) => {
  // State pour le menu contextuel
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Ouvrir/Fermer le menu contextuel
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Actions du menu
  const handleEdit = () => {
    console.log("Modifier le post");
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Supprimer le post");
    handleMenuClose();
  };

  return (
    <PostContainer>
      {/* Post Header */}
      <PostHeader>
        <PostHeaderInfo>
          <Avatar sx={{ width: 42, height: 42 }} />
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>username</Typography>
            <Typography variant="caption" color="text.secondary">@username • il y a 5 minutes</Typography>
          </div>
        </PostHeaderInfo>
        {/* Bouton More (avec menu contextuel) */}
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>

        {/* Menu contextuel */}
        <Menu
        sx={{
          maxWidth: 200,
          textAlign: 'center',
        }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleEdit}>Modifier</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "red" }}>Supprimer</MenuItem>
        </Menu>
      </PostHeader>

      {/* Post Content */}
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="body2" sx={{ padding: "16px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et faucibus diam. Cras nec dui sed sem.
        </Typography>
      </CardContent>

      {/* Post Image 
      <CardMedia
        component="img"
        image="https://www.lemediaplus.com/wp-content/uploads/2025/01/CANAL-les-NBA-Paris-Games-2025-en-clair-les-23-et-25-janvier.jpg"
        alt="Post image"
        sx={{ padding: 0, margin: 0 }}
      />
*/}
      {/* Post Actions */}
      <PostActions>
        <IconButton size="small"><ThumbUpOutlinedIcon fontSize="small" /></IconButton>
        <Typography variant="caption">15</Typography>
        <IconButton size="small"><ChatBubbleOutlineIcon fontSize="small" /></IconButton>
        <Typography variant="caption">3</Typography>
        <IconButton size="small"><BookmarkBorderIcon fontSize="small" /></IconButton>
      </PostActions>

      {/* Section des commentaires */}
      <CommentsList>
        <Typography variant="subtitle2" sx={{ fontSize: "12px", fontWeight: 600 }}>Commentaires (3)</Typography>
        <CommentBox>
          <Avatar sx={{ width: 28, height: 28 }} />
          <Typography variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        </CommentBox>
        <CommentBox>
          <Avatar sx={{ width: 28, height: 28 }} />
          <Typography variant="body2">Lorem ipsum dolor sit amet.</Typography>
        </CommentBox>
      </CommentsList>

      {/* Comment Input */}
      <CommentSection>
        <Avatar sx={{ width: 32, height: 32 }} />
        <CommentInput>
          <InputBase placeholder="Écrire un commentaire..." sx={{ flex: 1, fontSize: "0.875rem" }} />
          <Button variant="contained" size="small"><SendIcon fontSize="small" /></Button>
        </CommentInput>
      </CommentSection>
    </PostContainer>
  );
};

export default PostCard;
