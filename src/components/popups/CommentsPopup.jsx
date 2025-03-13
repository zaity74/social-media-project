import { Dialog, DialogTitle, DialogContent, Box, Avatar, Typography, styled } from '@mui/material';
import { comments } from '../items/comments';

const CommentItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '12px',
  gap: '12px',
  borderBottom: '1px solid #E0E0E0'
}));

const CommentAvatar = styled(Avatar)({
  width: 40,
  height: 40
});

const CommentContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});

const Username = styled(Typography)({
  fontFamily: 'Joti One',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '100%',
  color: '#000000'
});

const CommentText = styled(Typography)({
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '150%',
  color: '#000000'
});

const TimeStamp = styled(Typography)( {
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '12px',
  color: '#666666',
  marginLeft: 'auto'
});

const ScrollableDialogContent = styled(DialogContent)( {
  maxHeight: '60vh', // Set maximum height to 60% of viewport height
  overflowY: 'auto', // Enable vertical scrolling
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
    '&:hover': {
      background: '#555',
    },
  },
});

const CommentsPopup = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '20px'
      }}>
        Commentaires
      </DialogTitle>
      <ScrollableDialogContent>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAvatar src={comment.avatar} />
            <CommentContent>
              <Username>{comment.username}</Username>
              <CommentText>{comment.comment}</CommentText>
            </CommentContent>
            <TimeStamp>{comment.time}</TimeStamp>
          </CommentItem>
        ))}
      </ScrollableDialogContent>
    </Dialog>
  );
};

export default CommentsPopup;