import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const PostContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: 600,
  borderRadius: '24px',
  overflow: 'hidden', // ✅ Garde les coins arrondis même avec une image
  boxShadow: 'none', // ✅ Supprime l'ombre qui pouvait donner l'effet de marge
}));

export const PostHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const PostHeaderInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1), // ✅ Réduction de l'espace entre l'avatar et les infos
}));

export const PostActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2), // ✅ Padding réduit
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CommentSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2), // ✅ Padding ajusté ici
}));

export const CommentInput = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '24px',
  padding: '6px 12px', // ✅ Ajustement du padding
}));

export const CommentsList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2), // ✅ Padding réduit
  backgroundColor: theme.palette.grey[900],
  color: 'white',
  borderRadius: '16px',
  margin: theme.spacing(2),
}));

export const CommentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));
