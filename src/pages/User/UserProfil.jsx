import { useState } from "react";
import { Stack } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useDarkMode } from "../../context/DarkModeContext";
import ProfilePageHeader from "../../components/profile/ProfilePage";
import PostCard from "../../components/posts/PostCard";

import { 
  PostsStack
 } from "../HomePage.styles";
const UserProfile = () => {
  const [sortBy, setSortBy] = useState("recent");
  useDarkMode(); 

  const posts = [
    { id: 1, username: "User1", content: "Premier post test", timestamp: "il y a 5 minutes" },
    { id: 2, username: "User2", content: "Deuxième post test", timestamp: "il y a 10 minutes" },
  ];


  return (
    <MainLayout>

      <ProfilePageHeader></ProfilePageHeader>

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

export default UserProfile;
