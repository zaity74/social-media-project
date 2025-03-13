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
  const { user: currentUser, updateUserData } = useUser(); // Récupère `updateUserData`
  const [openDialog, setOpenDialog] = useState(false);

  const { users, loading, error } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Récupérer l'utilisateur connecté depuis Redux
  const fullUserData = users.find((user) => user._id === currentUser?.id) || currentUser;

  const handleDialogToggle = () => {
    setOpenDialog((prev) => !prev);
  };

  // Suivre un utilisateur et mettre à jour Redux
  const handleFollow = async (targetUserId) => {
    if (!fullUserData || !fullUserData._id) {
      console.error("❌ Impossible de suivre : ID utilisateur introuvable.");
      return;
    }

    console.log("Envoi du follow :", fullUserData._id, "➡", targetUserId);
    await dispatch(followUser(fullUserData._id, targetUserId));

    // Mise à jour Redux et UserContext
    const updatedUser = {
      ...fullUserData,
      following: [...(fullUserData.following || []), targetUserId],
    };
    updateUserData(updatedUser);
    dispatch(getUsers()); // Recharge les utilisateurs après un follow
  };

  // ✅ Se désabonner et mettre à jour Redux
  const handleUnfollow = async (targetUserId) => {
    if (!fullUserData || !fullUserData._id) {
      console.error("❌ Impossible de se désabonner : ID utilisateur introuvable.");
      return;
    }

    console.log("📌 Envoi du unfollow :", fullUserData._id, "❌", targetUserId);
    await dispatch(unfollowUser(fullUserData._id, targetUserId));

    // Mise à jour Redux et UserContext
    const updatedUser = {
      ...fullUserData,
      following: (fullUserData.following || []).filter((id) => id !== targetUserId),
    };
    updateUserData(updatedUser);
    dispatch(getUsers()); // Recharge les utilisateurs après un unfollow
  };

  if (loading) return <p>🔄 Chargement des suggestions...</p>;
  if (error) return <p>❌ Erreur : {error}</p>;
  if (!users || users.length === 0) return <p>😕 Aucun utilisateur à suggérer.</p>;

  // Exclure l'utilisateur connecté et mettre à jour `isFollowing`
  const formattedUsers = users
    .filter((user) => user._id !== fullUserData._id)
    .map((user) => ({
      ...user,
      showFollowButton: true,
      isFollowing: fullUserData.following?.includes(user._id),
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
        onActionClick={handleDialogToggle}
      />

      <SuggestionListPopup open={openDialog} onClose={handleDialogToggle} suggestions={formattedUsers} />
    </>
  );
};

export default SuggestionList;
