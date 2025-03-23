import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // ✅ Import pour le lien de profil
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
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete"; // ✅ Icône pour supprimer un commentaire
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

import { deletePost, unlikePost, likePost } from "../../redux/action/postActions";
import { useUser } from "../../context/UserContext";
import { deleteComment, addComment, getComments } from "../../redux/action/postActions";

const PostCard = ({ post, onPostDeleted, onLikeToggle }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useUser();

  const comments = useSelector((state) => state.userComment.commentsByPost[post._id]) || [];
  const users = useSelector((state) => state.getUsers.users);
  const postAuthor = users?.find((user) => user._id === post.author);

  const [anchorEl, setAnchorEl] = useState(null);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(currentUser?._id));

  const open = Boolean(anchorEl);

  // Charger les commentaires au montage
  useEffect(() => {
    dispatch(getComments(post._id));
  }, [dispatch, post._id]);

  const isLiked = post.likes.includes(currentUser?._id);

  const handleLike = async () => {
    if (!currentUser) return;

    const updatedPost = { ...post };
    
    if (liked) {
      setLikesCount((prev) => prev - 1);
      setLiked(false);
      updatedPost.likes = updatedPost.likes.filter(id => id !== currentUser._id);
      await dispatch(unlikePost(post._id, currentUser._id));
    } else {
      setLikesCount((prev) => prev + 1);
      setLiked(true);
      updatedPost.likes = [...updatedPost.likes, currentUser._id];
      await dispatch(likePost(post._id, currentUser._id));
    }

    if (onLikeToggle) {
      onLikeToggle(updatedPost);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  // **Ajouter un commentaire**
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return; // ✅ Vérification du texte du commentaire

    const newComment = {
      author: currentUser._id,
      content: comment,
      post: post._id,
    };

    await dispatch(addComment(post._id, newComment));
    setComment(""); // Réinitialiser le champ de saisie
    dispatch(getComments(post._id)); // Met à jour la liste des commentaires sans refresh
  };

  // **Supprimer un commentaire**
  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId, post._id));
    dispatch(getComments(post._id)); // ✅ Met à jour la liste des commentaires après suppression
  };

  return (
    <PostContainer>
      <PostHeader>
        <PostHeaderInfo>
          {/* Lien vers le profil de l'utilisateur */}
          <Link to={`/profil/${postAuthor?._id}`} style={{ textDecoration: "none" }}>
            <Avatar src={postAuthor?.avatar || "/default-avatar.png"} sx={{ width: 42, height: 42, cursor: "pointer" }} />
          </Link>
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {postAuthor?.username || "Utilisateur inconnu"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{postAuthor?.username?.toLowerCase()} • {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </div>
        </PostHeaderInfo>

        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>

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
        {post.hashtags?.length > 0 && (
          <Typography
            variant="body2"
            sx={{ paddingX: "16px", color: "primary.main"}}
          >
            {post.hashtags.map((tag, index) => (
              <Link
                key={index}
                to={`#`}
                style={{ marginRight: "8px", color: "#1976d2", textDecoration: "none" }}
              >
                {tag}
              </Link>
            ))}
          </Typography>
        )}
      </CardContent>

      {post.image && <CardMedia component="img" image={post.image} alt="Post image" sx={{ padding: 0, margin: 0 }} />}

      {/* Post Actions */}
      <PostActions>
        <IconButton size="small" onClick={handleLike}>
          {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
        </IconButton>
        <Typography variant="caption">{likesCount}</Typography>

        <IconButton size="small" onClick={toggleComments}>
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption">{comments.length}</Typography>
      </PostActions>

      {/* Section Commentaires */}
      {showComments && (
        <>
          <CommentsList>
            {comments.map((c) => (
              <CommentBox key={c._id}>
                <Link to={`/profil/${c.author._id}`} style={{ textDecoration: "none" }}>
                  <Avatar src={c.author.avatar} sx={{ width: 28, height: 28 }} />                </Link>
                <Typography variant="body2">{c.content}</Typography>
                {currentUser._id === c.author._id && (
                  <IconButton size="small" onClick={() => handleDeleteComment(c._id)}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                )}
              </CommentBox>
            ))}
          </CommentsList>

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
