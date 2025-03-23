import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useUser } from "../../context/UserContext";
import ItemList from "../utils/List";
import SuggestionListPopup from "../popups/SuggestionListPopup";
import { getUsers, followUser, unfollowUser } from "../../redux/action/userActions";

const SuggestionList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user: currentUser } = useUser(); 
  const [openDialog, setOpenDialog] = useState(false);

  // Récupération des utilisateurs depuis Redux
  const { users, loading, error } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(getUsers()); 
  }, [dispatch]);

  if (loading) return <p>🔄 Chargement des suggestions...</p>;
  if (error) return <p>❌ Erreur : {error}</p>;
  if (!users || users.length === 0) return <p>😕 Aucun utilisateur à suggérer.</p>;

  // 🔹 Vérifier que `currentUser` est bien défini
  if (!currentUser || !currentUser._id) {
    return <p>🔄 Chargement des données utilisateur...</p>;
  }

  // 🔹 Fonction Follow
  const handleFollow = async (targetUserId) => {
    console.log(" Follow : ", currentUser._id, "➡", targetUserId);
    await dispatch(followUser(currentUser._id, targetUserId));

    // Recharge les données utilisateur après follow
    dispatch(getUsers());
  };

  // 🔹 Fonction Unfollow
  const handleUnfollow = async (targetUserId) => {
    console.log("❌ Unfollow : ", currentUser._id, "➡", targetUserId);
    await dispatch(unfollowUser(currentUser._id, targetUserId));

    // Recharge les données utilisateur après unfollow
    dispatch(getUsers());
  };

  // 🔹 Exclure l'utilisateur connecté et ajouter l'état de follow/unfollow
  const formattedUsers = users
  .filter((user) => user._id !== currentUser._id)
  .map((user) => ({
    _id: user._id, // ✅ Ajout de l'ID pour la navigation
    avatar: user.avatar,
    username: user.username,
    description: user.bio || "",
    showFollowButton: true,
    isFollowing: currentUser.following?.includes(user._id),
    onFollowClick: () => handleFollow(user._id),
    onUnfollowClick: () => handleUnfollow(user._id),
  }));

  return (
    <>
      <ItemList
        title="Suggestions"
        data={formattedUsers}
        borderColor={theme.palette.secondary.main}
        action="Voir plus"
        borderRadiusValue="24px 0px 0px 24px"
        borderDirection="borderLeft"
        onActionClick={() => setOpenDialog(true)}
      />

      <SuggestionListPopup open={openDialog} onClose={() => setOpenDialog(false)} suggestions={formattedUsers} />
    </>
  );
};

export default SuggestionList;
