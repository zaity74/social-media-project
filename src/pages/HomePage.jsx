import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import CreatePost from '../components/posts/CreatePost';
import PostCard from '../components/posts/PostCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDarkMode } from '../context/DarkModeContext';
import { useTheme } from '@mui/material/styles'; // ✅ Ajout de useTheme

const HomePage = () => {
  const [sortBy, setSortBy] = useState('recent');
  const { isDarkMode } = useDarkMode();
  const theme = useTheme(); // ✅ Utilisation de useTheme

  const posts = [
    {
      id: 1,
      username: 'User1',
      content: 'Premier post test',
      timestamp: 'il y a 5 minutes'
    },
    {
      id: 2,
      username: 'User2',
      content: 'Deuxième post test',
      timestamp: 'il y a 10 minutes'
    }
  ];

  return (
    <MainLayout>
      {/* Création de Post */}
      <CreatePost />

      {/* Filtre  */}
      <Box 
        sx={{ 
          display: "flex",
          alignItems: "center",
          mb: 2,
          mt: 2,
          position: "relative",
          "&::before": {
            content: '""',
            display: "block",
            width: '70%',
            height: "2px", // Épaisseur du trait
            backgroundColor: theme.palette.lightExtra.main, 
            marginRight: "10px", // Espacement avec le texte
          }
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600, 
            fontSize: "14px", 
            color: theme.palette.text.primary, 
            display: "flex",
            alignItems: "center",
            gap: "5px" // Espacement avec l'icône
          }}
        >
          Trier par: Récents <KeyboardArrowDownIcon fontSize="small" />
        </Typography>
      </Box>

      {/* Liste des Posts */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </MainLayout>
  );
}

export default HomePage;
