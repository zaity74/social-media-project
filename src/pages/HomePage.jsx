import { useState } from "react";
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
  SortMenuItem
} from './HomePage.styles'

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
      case "recent": return "Récents";
      case "popular": return "Populaire";
      case "followed": return "Suivis";
      default: return "Récents";
    }
  };

  const posts = [
    { id: 1, username: "User1", content: "Premier post test", timestamp: "il y a 5 minutes" },
    { id: 2, username: "User2", content: "Deuxième post test", timestamp: "il y a 10 minutes" },
  ];

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
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      </PostsStack>
    </MainLayout>
  );
};

export default HomePage;
