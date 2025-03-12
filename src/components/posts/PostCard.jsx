import { Avatar, CardContent, CardMedia, IconButton, Typography, InputBase, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendIcon from '@mui/icons-material/Send';
import { PostContainer, PostHeader, PostHeaderInfo, PostActions, CommentSection, CommentInput, CommentsList, CommentBox } from './PostCard.styles';

const PostCard = ({ post }) => {
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
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </PostHeader>

      {/* Post Content */}
      <CardContent sx={{ padding: 0 }}> {/* ✅ Suppression du padding */}
        <Typography variant="body2" sx={{ padding: '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et faucibus diam. Cras nec dui sed sem.
        </Typography>
      </CardContent>

      {/* Post Image */}
      <CardMedia
        component="img"
        image="https://source.unsplash.com/random"
        alt="Post image"
        sx={{ padding: 0, margin: 0 }} // ✅ Suppression de tout padding/margin
      />

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
        <Typography variant="subtitle2" sx={{ fontSize: '12px', fontWeight: 600 }}>Commentaires (3)</Typography>
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
          <InputBase placeholder="Écrire un commentaire..." sx={{ flex: 1, fontSize: '0.875rem' }} />
          <Button variant="contained" size="small"><SendIcon fontSize="small" /></Button>
        </CommentInput>
      </CommentSection>
    </PostContainer>
  );
}

export default PostCard;
