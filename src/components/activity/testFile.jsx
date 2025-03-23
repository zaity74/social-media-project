// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTheme, CircularProgress, Button } from "@mui/material";
// import ItemList from "../utils/List";
// import ActivityListPopup from "../popups/ActivityListPopup";
// import { getNotifications, clearNotifications } from "../../redux/action/notificationAction";
// import { getUsers } from "../../redux/action/userActions"; // ✅ Import de getUsers
// import { useUser } from "../../context/UserContext";

// const ActivityList = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { user } = useUser(); // ✅ Récupération de l'utilisateur connecté

//   // Récupération des notifications depuis Redux
//   const { notifications, loading, error } = useSelector((state) => state.userNotification);
//   const { users, loading: usersLoading } = useSelector((state) => state.getUsers); // ✅ Récupération des utilisateurs

//   // State pour gérer l'ouverture du popup
//   const [openDialog, setOpenDialog] = useState(false);

//   // Charger les notifications et utilisateurs au montage
//   useEffect(() => {
//     if (user?._id) {
//       dispatch(getNotifications(user._id));
//       // dispatch(getUsers()); // ✅ Charger tous les utilisateurs pour afficher leurs avatars & noms
//     }
//   }, [dispatch, user]);

//   // Ouvre/Ferme le popup
//   const handleDialogToggle = () => {
//     setOpenDialog((prev) => !prev);
//   };

//   // Supprimer toutes les notifications
//   const handleClearNotifications = () => {
//     if (user?._id) {
//       dispatch(clearNotifications(user._id));
//     }
//   };

//   // ✅ Récupérer l'avatar et le username de l'utilisateur à partir de son ID
//   const getUserInfo = (userId) => {
//     const foundUser = users?.find((u) => u._id === userId);
//     return {
//       username: foundUser?.username || "Utilisateur",
//       avatar: foundUser?.avatar || "/default-avatar.png",
//     };
//   };

//   return (
//     <>
//       {/* ✅ Ajout du popup pour afficher plus d'activités */}
//       {loading || usersLoading ? (
//         <CircularProgress />
//       ) : error ? (
//         <p>❌ Erreur : {error}</p>
//       ) : (
//         <ItemList
//           title="Activités"
//           data={notifications?.map((notif) => {
//             const { username, avatar } = getUserInfo(notif.user?._id);
//             return {
//               _id: notif.user?._id, // ✅ ID pour lien vers le profil
//               username,
//               description: notif.content || "Nouvelle notification",
//               avatar,
//               showFollowButton: false,
//             };
//           })}
//           borderColor={theme.palette.secondary.main}
//           action="Voir plus"
//           borderRadiusValue="24px 0px 0px 24px"
//           borderDirection="borderLeft"
//           onActionClick={handleDialogToggle} // ✅ Gère l'ouverture du popup
//         />
//       )}

//       {/* Bouton pour supprimer toutes les notifications */}
//       {notifications?.length > 0 && (
//         <Button variant="contained" color="error" onClick={handleClearNotifications} sx={{ mt: 2 }}>
//           Effacer les notifications
//         </Button>
//       )}

//       {/* Popup des activités */}
//       <ActivityListPopup open={openDialog} onClose={handleDialogToggle} activities={notifications} />
//     </>
//   );
// };

// export default ActivityList;