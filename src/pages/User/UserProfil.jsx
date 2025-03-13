import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import ProfilePageHeader from "../../components/profile/ProfilePage";
import PostCard from "../../components/posts/PostCard";
import { PostsStack } from "../HomePage.styles";
import { getPostsByUser } from "../../redux/action/postActions";
import { useUser } from "../../context/UserContext";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useUser(); // ✅ Récupère l'utilisateur connecté

  // ✅ Récupère les posts de l'utilisateur depuis Redux
  const { userPosts, loading, error } = useSelector((state) => state.postsByUser);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getPostsByUser(currentUser._id));
    }
  }, [dispatch, currentUser]);

  return (
    <MainLayout>
      <ProfilePageHeader />

      <PostsStack>
        <Stack spacing={2}>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error}</p>
          ) : userPosts.length === 0 ? (
            <p>Aucun post disponible.</p>
          ) : (
            userPosts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </Stack>
      </PostsStack>
    </MainLayout>
  );
};

export default UserProfile;
