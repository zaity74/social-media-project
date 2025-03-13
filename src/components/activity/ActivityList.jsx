import { useState } from "react";
import { useTheme } from "@mui/material";
import ItemList from "../utils/List";
import ActivityListPopup from "../popups/ActivityListPopup";

const ActivityList = () => {
  const theme = useTheme();

  // State pour gérer l'ouverture du popup
  const [openDialog, setOpenDialog] = useState(false);

  // Ouvre/Ferme le popup
  const handleDialogToggle = () => {
    setOpenDialog((prev) => !prev);
  };

  // Liste des activités
  const activities = [
    {
      username: "UserX",
      description: "a commencé à te suivre il y a 5 min",
      avatar: "/path/to/avatar1.jpg",
      showFollowButton: true,
    },
    {
      username: "UserX",
      description: "a aimé ton post il y a 5 min",
      avatar: "/path/to/avatar2.jpg",
      showFollowButton: false,
    },
  ];

  return (
    <>
      {/* ✅ Ajout du popup pour afficher plus d'activités */}
      <ItemList
        title="Activités"
        data={activities}
        borderColor={theme.palette.secondary.main}
        action="Voir plus"
        borderRadiusValue="24px 0px 0px 24px"
        borderDirection="borderLeft"
        onActionClick={handleDialogToggle} // ✅ Gère l'ouverture du popup
      />

      {/* Popup des activités */}
      <ActivityListPopup open={openDialog} onClose={handleDialogToggle} activities={activities} />
    </>
  );
};

export default ActivityList;
