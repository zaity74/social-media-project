import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, CircularProgress, Button } from "@mui/material";
import ItemList from "../utils/List";
import ActivityListPopup from "../popups/ActivityListPopup";
import { getNotifications, clearNotifications } from "../../redux/action/notificationAction";
import { useUser } from "../../context/UserContext";

const ActivityList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useUser(); // ✅ Récupération de l'utilisateur connecté

  // Récupération des notifications depuis Redux
  const { notifications, loading, error } = useSelector((state) => state.userNotification);

  // State pour gérer l'ouverture du popup
  const [openDialog, setOpenDialog] = useState(false);

  // Charger les notifications au montage
  useEffect(() => {
    if (user?._id) {
      dispatch(getNotifications(user._id));
    }
  }, [dispatch, user]);

  // Ouvre/Ferme le popup
  const handleDialogToggle = () => {
    setOpenDialog((prev) => !prev);
  };

  // Supprimer toutes les notifications
  const handleClearNotifications = () => {
    if (user?._id) {
      dispatch(clearNotifications(user._id));
    }
  };

  return (
    <>
      {/* ✅ Ajout du popup pour afficher plus d'activités */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>❌ Erreur : {error}</p>
      ) : (
        <ItemList
          title="Activités"
          data={notifications?.map((notif) => ({
            _id: notif.user?._id,
            username: notif.user?.username || "Utilisateur",
            description: notif.content || "Nouvelle notification",
            avatar: notif.user?.avatar || "/default-avatar.png",
            postImage: notif.targetModel === "Post" ? notif.targetId?.image : null,
            postContent: notif.targetModel === "Post" ? notif.targetId?.content : null,
            showFollowButton: false,
          }))}
          borderColor={theme.palette.secondary.main}
          action="Voir plus"
          borderRadiusValue="24px 0px 0px 24px"
          borderDirection="borderLeft"
          onActionClick={handleDialogToggle} // ✅ Gère l'ouverture du popup
        />
      )}

      {/* Bouton pour supprimer toutes les notifications */}
      {notifications?.length > 0 && (
        <Button variant="contained" color="error" onClick={handleClearNotifications} sx={{ mt: 2 }}>
          Effacer les notifications
        </Button>
      )}

      {/* Popup des activités */}
      <ActivityListPopup open={openDialog} onClose={handleDialogToggle} activities={notifications} />
    </>
  );
};

export default ActivityList;
