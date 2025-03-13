import React, { useState, useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import CreatePost from "../components/posts/CreatePost";
import PostCard from "../components/posts/PostCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDarkMode } from "../context/DarkModeContext";
import { useTheme } from "@mui/material/styles"; // ✅ Ajout de useTheme
import SnapshotCapture from "../components/snapshotCapture/snapshotCapture";

const HomePage = () => {
  const [sortBy, setSortBy] = useState("recent");
  const { isDarkMode } = useDarkMode();
  const theme = useTheme(); // ✅ Utilisation de useTheme

  const posts = [
    {
      id: 1,
      username: "User1",
      content: "Premier post test",
      timestamp: "il y a 5 minutes",
    },
    {
      id: 2,
      username: "User2",
      content: "Deuxième post test",
      timestamp: "il y a 10 minutes",
    },
    {
      id: 3,
      username: "User3",
      content: "Troisieme post test",
      timestamp: "il y a 15 minutes",
    },
  ];

  // Tableau de références pour chaque tweet
  const postRefs = useRef([]);
  postRefs.current = posts.map(
    (_, i) => postRefs.current[i] || React.createRef()
  );
  const [currentTweetId, setCurrentTweetId] = useState(null);

  // Fonction pour recalculer le tweet "lu"
  const recalcCurrentTweet = () => {
    let chosenTweet = null;

    // Parcourir tous les posts dans l'ordre
    for (let i = 0; i < postRefs.current.length; i++) {
      const ref = postRefs.current[i];
      if (!ref.current) continue;

      const rect = ref.current.getBoundingClientRect();
      const totalHeight = rect.height;
      // Calcul de la hauteur visible de l'élément
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      // Si au moins 90% du post est visible, on le considère comme "lu"
      if (visibleHeight >= 0.9 * totalHeight) {
        chosenTweet = ref.current.getAttribute('data-id');
        break;
      }
    }
    setCurrentTweetId(chosenTweet);
    console.log(`Tweet actuellement lu : ${chosenTweet ? chosenTweet : 'Aucun'}`);
  };

  // useEffect pour recalculer le tweet lu lors du scroll (avec debounce)
  useEffect(() => {
    let scrollTimeout = null;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        recalcCurrentTweet();
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    // Premier calcul lors du montage
    recalcCurrentTweet();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [posts]);


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
            width: "70%",
            height: "2px", // Épaisseur du trait
            backgroundColor: theme.palette.lightExtra.main,
            marginRight: "10px", // Espacement avec le texte
          },
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
            gap: "5px", // Espacement avec l'icône
          }}
        >
          Trier par: Récents <KeyboardArrowDownIcon fontSize="small" />
        </Typography>
      </Box>

      {/* Liste des Posts */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        {posts.map((post, index) => (
          <div key={post.id} ref={postRefs.current[index]} data-id={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </Stack>

      <SnapshotCapture 
        onSnapshot={(img) => console.log("Snapshot capturé :", img)}
        observedElementRef={{ current: document.querySelector(`[data-id="${currentTweetId}"]`) }}
      />
    </MainLayout>
  );
};

export default HomePage;
