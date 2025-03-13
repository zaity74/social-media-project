import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  InputBase,
  Button,
  Menu,
  MenuItem,
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
  CommentBox,
} from "./PostCard.styles";
import { deletePost } from "../../redux/action/postActions";
import { useUser } from "../../context/UserContext";

const PostCard = ({ post, onPostDeleted }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useUser();

  const users = useSelector((state) => state.getUsers.users);
  const postAuthor = users?.find((user) => user._id === post.author);

  const [anchorEl, setAnchorEl] = useState(null);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false); // ✅ État pour afficher/masquer les commentaires
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Supprimer le post et mettre à jour l'état local
  const handleDelete = async () => {
    try {
      await dispatch(deletePost(post._id));
      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
    handleMenuClose();
  };

  // ✅ Toggle pour afficher/masquer les commentaires
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  // Soumission d'un commentaire
  const handleCommentSubmit = () => {
    if (comment.trim() === "") return;
    console.log(`Commentaire ajouté : ${comment}`);
    setComment("");
  };

  return (
    <PostContainer>
      {/* Post Header */}
      <PostHeader>
        <PostHeaderInfo>
          <Avatar src={postAuthor?.avatar || "/default-avatar.png"} sx={{ width: 42, height: 42 }} />
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {postAuthor?.username || "Utilisateur inconnu"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{postAuthor?.username?.toLowerCase()} • {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </div>
        </PostHeaderInfo>

        {/* Bouton More (avec menu contextuel) */}
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>

        {/* Menu contextuel */}
        <Menu
          sx={{ maxWidth: 200, textAlign: "center" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {currentUser?._id === post.author && (
            <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
              Supprimer
            </MenuItem>
          )}
        </Menu>
      </PostHeader>

      {/* Post Content */}
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="body2" sx={{ padding: "16px" }}>
          {post.content}
        </Typography>
      </CardContent>

      {/* Post Image (affichage conditionnel) */}
      {post.image && <CardMedia component="img" image={post.image} alt="Post image" sx={{ padding: 0, margin: 0 }} />}

      {/* Post Actions */}
      <PostActions>
        <IconButton size="small">
          <ThumbUpOutlinedIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{post.likes?.length || 0}</Typography>

        {/* ✅ Icône pour afficher/masquer les commentaires */}
        <IconButton size="small" onClick={toggleComments}>
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{post.comments?.length || 0}</Typography>

        <IconButton size="small">
          <BookmarkBorderIcon fontSize="small" />
        </IconButton>
      </PostActions>

      {/* ✅ Section Commentaires (s'affiche seulement si `showComments` est `true`) */}
      {showComments && (
        <>
          <CommentsList>
            <Typography variant="subtitle2" sx={{ fontSize: "12px", fontWeight: 600 }}>
              Commentaires ({post.comments?.length || 0})
            </Typography>

            {post.comments?.map((c, index) => (
              <CommentBox key={index}>
                <Avatar sx={{ width: 28, height: 28 }} />
                <Typography variant="body2">{c.content}</Typography>
              </CommentBox>
            ))}
          </CommentsList>

          {/* ✅ Formulaire d'Ajout de Commentaire */}
          <CommentSection>
            <Avatar sx={{ width: 32, height: 32 }} />
            <CommentInput>
              <InputBase
                placeholder="Écrire un commentaire..."
                sx={{ flex: 1, fontSize: "0.875rem" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="contained" size="small" onClick={handleCommentSubmit}>
                <SendIcon fontSize="small" />
              </Button>
            </CommentInput>
          </CommentSection>
        </>
      )}
    </PostContainer>
  );
};

export default PostCard;
