import React, { useState, useRef, useEffect } from "react";
import { Stack } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import CreatePost from "../components/posts/CreatePost";
import PostCard from "../components/posts/PostCard";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useDarkMode } from "../context/DarkModeContext";
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
  const [sortBy, setSortBy] = useState("recent");
  useDarkMode();
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
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      // Si au moins 90% du post est visible, on le considère comme "lu"
      if (visibleHeight >= 0.9 * totalHeight) {
        chosenTweet = ref.current.getAttribute("data-id");
        break;
      }
    }
    setCurrentTweetId(chosenTweet);
    console.log(
      `Tweet actuellement lu : ${chosenTweet ? chosenTweet : "Aucun"}`
    );
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

    window.addEventListener("scroll", handleScroll);
    // Premier calcul lors du montage
    recalcCurrentTweet();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [posts]);

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

        <Stack spacing={2} sx={{ width: "100%" }}>
          {posts.map((post, index) => (
            <div key={post.id} ref={postRefs.current[index]} data-id={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </Stack>

        <SnapshotCapture
          observedElementRef={{
            current: document.querySelector(`[data-id="${currentTweetId}"]`),
          }}
        />
    </MainLayout>
  );
};

export default HomePage;
