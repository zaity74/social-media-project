import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import CreatePost from "../components/posts/CreatePost";
import PostCard from "../components/posts/PostCard";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useDarkMode } from "../context/DarkModeContext";
import { getPosts } from "../redux/action/postActions";
import SnapshotCapture from "../components/snapshotCapture/snapshotCapture";

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
  const postRefs = useRef([]);
  const observedElementRef = useRef(null);

  // ✅ Charger les posts depuis Redux
  const { posts, loading, error } = useSelector((state) => state.getAllPost);
  const [localPosts, setLocalPosts] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [waitingForScroll, setWaitingForScroll] = useState(false);

  // ✅ Charger les posts au montage
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // ✅ Stocker les posts en local et créer des références pour chaque post
  useEffect(() => {
    if (posts.length > 0) {
      setLocalPosts(posts);
      postRefs.current = posts.map(() => React.createRef());
    }
  }, [posts]);

  // ✅ Ajout d'un post sans rechargement
  const handlePostCreated = (newPost) => {
    setLocalPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // ✅ Suppression dynamique d'un post
  const handlePostDeleted = (deletedPostId) => {
    setLocalPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  // ✅ Gestion du tri des posts
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

  // ✅ Détection du post visible sur la page
  const detectVisiblePost = () => {
    let visiblePostId = null;
    for (let i = 0; i < postRefs.current.length; i++) {
      const ref = postRefs.current[i];
      if (!ref.current) continue;

      const rect = ref.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      if (visibleHeight >= 0.75 * totalHeight) {
        visiblePostId = ref.current.getAttribute("data-id");
        break;
      }
    }

    if (visiblePostId !== currentPostId) {
      setCurrentPostId(visiblePostId);
      observedElementRef.current = postRefs.current.find(ref => ref.current?.getAttribute("data-id") === visiblePostId)?.current || null;
    }
  };

  // ✅ Détection du scroll principal avec timeout
  useEffect(() => {
    let scrollTimeout = null;
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setWaitingForScroll(true);
        detectVisiblePost();
      }, 500); // Timeout après 500ms d'arrêt du scroll
    };

    window.addEventListener("scroll", handleScroll);
    detectVisiblePost();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [localPosts]);

  return (
    <MainLayout>
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
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error}</p>
          ) : localPosts.length === 0 ? (
            <p>Aucun post disponible.</p>
          ) : (
            localPosts.map((post, index) => (
              <div key={post._id} ref={postRefs.current[index]} data-id={post._id}>
                <PostCard post={post} onPostDeleted={handlePostDeleted} />
              </div>
            ))
          )}
        </Stack>
      </PostsStack>

      <SnapshotCapture observedElementRef={observedElementRef} isScrolling={isScrolling} waitingForScroll={waitingForScroll} />
    </MainLayout>
  );
};

export default HomePage;