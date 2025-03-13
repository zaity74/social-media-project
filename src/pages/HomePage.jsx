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
import SnapshotCapture from "../components/snapshotCapture/snapshotCapture";

const HomePage = () => {
  const dispatch = useDispatch();
  useDarkMode(); 

  // Charger les posts depuis Redux
  const { posts, loading, error } = useSelector((state) => state.getAllPost);
  
  useEffect(() => {
    dispatch(getPosts()); // Charger les posts au montage
  }, [dispatch]);

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
        return "Populaire";
      case "followed":
        return "Suivis";
      default:
        return "Récents";
    }
  };

  return (
    <MainLayout>
      <CreatePost />

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
          {/* Affichage dynamique des posts */}
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error}</p>
          ) : posts.length === 0 ? (
            <p>Aucun post disponible.</p>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </Stack>

        <SnapshotCapture
          observedElementRef={{
            current: document.querySelector(`[data-id="${currentTweetId}"]`),
          }}
        />
    </PostsStack> {/* ✅ Fermeture correcte ici */}
    </MainLayout>
  );
};

export default HomePage;
