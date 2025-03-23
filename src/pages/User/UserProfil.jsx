import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Récupérer du parametre ID de l'URL
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import ProfilePageHeader from "../../components/profile/ProfilePage";
import PostCard from "../../components/posts/PostCard";
import { PostsStack } from "../HomePage.styles";
import { getPostsByUser } from "../../redux/action/postActions";
import { useUser } from "../../context/UserContext";
import { getUsers } from "../../redux/action/userActions";


const UserProfile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useUser(); // Récupère l'utilisateur connecté
  const { id } = useParams(); // Récupération de l'ID de l'utilisateur depuis l'URL

  // Récupère les posts de l'utilisateur depuis Redux
  const { users } = useSelector((state) => state.getUsers); // Récupération de tous les utilisateurs
  const { userPosts, loading, error } = useSelector((state) => state.postsByUser);

  // Récupérer l'utilisateur correspondant à l'ID de l'URL ou fallback sur l'utilisateur connecté
  const profileUser = users.find((u) => u._id === id) || currentUser;

  useEffect(() => {
    dispatch(getUsers()); // Charge tous les utilisateurs au montage
  }, [dispatch]);

  useEffect(() => {
    if (profileUser?._id) {
      dispatch(getPostsByUser(profileUser._id));
    }
  }, [dispatch, profileUser]);

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
