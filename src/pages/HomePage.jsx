import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import CreatePost from "../components/posts/CreatePost";
import PostCard from "../components/posts/PostCard";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useDarkMode } from "../context/DarkModeContext";
import { getPosts } from "../redux/action/postActions"; // ✅ Import de l'action getPosts
import {
  SortContainer,
  SortButton,
  SortIconWrapper,
  PostsStack,
  SortMenu,
  SortMenuItem,
} from "./HomePage.styles";

const HomePage = () => {
  const dispatch = useDispatch();
  useDarkMode(); 

  // Charger les posts depuis Redux
  const { posts, loading, error } = useSelector((state) => state.getAllPost);

  // État local pour afficher dynamiquement les nouveaux posts
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    dispatch(getPosts()); // Charger les posts au montage
  }, [dispatch]);

  // Initialisation de localPosts avec Redux une seule fois
  useEffect(() => {
    if (posts.length > 0) {
      setLocalPosts(posts);
    }
  }, [posts]);

  // Met à jour localPosts quand un post est publié sans recharger la page
  const handlePostCreated = (newPost) => {
    setLocalPosts([newPost, ...localPosts]); // Ajoute le post en haut de la liste
  };

  // 🔥 Mise à jour locale après suppression d’un post
  const handlePostDeleted = (postId) => {
    setLocalPosts(localPosts.filter((post) => post._id !== postId));
  };

  const [sortBy, setSortBy] = useState("recent");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    handleSortClose();
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "recent":
        return "Récents";
      case "popular":
        return "Populaires";
      case "followed":
        return "Suivis";
      default:
        return "Récents";
    }
  };

  return (
    <MainLayout>
      {/* ✅ On passe `handlePostCreated` à `CreatePost` */}
      <CreatePost onPostCreated={handlePostCreated} />

      <SortContainer>
        <SortButton
          onClick={handleSortClick}
          aria-controls={open ? "sort-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          Trier par: {getSortLabel()}
          <SortIconWrapper>
            <KeyboardDoubleArrowDownIcon fontSize="small" />
          </SortIconWrapper>
        </SortButton>

        <SortMenu
          id="sort-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleSortClose}
          MenuListProps={{ "aria-labelledby": "sort-button" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {["recent", "popular", "followed"].map((option) => (
            <SortMenuItem
              key={option}
              onClick={() => handleSortChange(option)}
              selected={sortBy === option}
            >
              {getSortLabel(option)}
            </SortMenuItem>
          ))}
        </SortMenu>
      </SortContainer>

      
      <PostsStack>
        <Stack spacing={2}>
          {/* ✅ On affiche `localPosts` au lieu de `posts` */}
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error}</p>
          ) : localPosts.length === 0 ? (
            <p>Aucun post disponible.</p>
          ) : (
            localPosts.map((post) => (
              <PostCard key={post._id} post={post} onPostDeleted={handlePostDeleted} />
            ))
          )}
        </Stack>
      </PostsStack>
    </MainLayout>
  );
};

export default HomePage;
