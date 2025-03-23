import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchPosts } from "../redux/action/postActions";
import PostCard from "../components/posts/PostCard";
import { Stack, Typography } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const query = useQuery().get("q");
  const userParam = useQuery().get("user");
  const { posts, loading } = useSelector((state) => state.getAllPost);

  useEffect(() => {
    if (query || userParam) {
      dispatch(searchPosts(query, userParam));
    }
  }, [dispatch, query, userParam]);

  return (
    <MainLayout>
        <Stack spacing={2} mt={4}>
        <Typography variant="h6">
        {query && !userParam && `Résultats pour : "${query}"`}
        {userParam && !query && `Publications de @${userParam}`}
        {query && userParam && `Résultats de "${query}" chez @${userParam}`}
        </Typography>
        {loading ? (
            <p>Chargement...</p>
        ) : posts.length === 0 ? (
            <p>Aucun résultat trouvé.</p>
        ) : (
            posts.map((post) => (
            <PostCard key={post._id} post={post} />
            ))
        )}
        </Stack>
    </MainLayout>
  );
};

export default SearchPage;
