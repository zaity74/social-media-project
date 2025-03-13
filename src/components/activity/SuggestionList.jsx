import { useState } from "react";
import { useTheme } from "@mui/material";
import ItemList from "../utils/List";
import SuggestionListPopup from "../popups/SuggestionListPopup";

const SuggestionList = () => {
  const theme = useTheme();

  // State pour la gestion du popup
  const [openDialog, setOpenDialog] = useState(false);

  // Ouvre/Ferme le popup
  const handleDialogToggle = () => {
    setOpenDialog((prev) => !prev);
  };

  const suggestions = [
    { username: "UserY", avatar: "/path/to/avatar1.jpg", showFollowButton: true },
    { username: "UserX", avatar: "/path/to/avatar2.jpg", showFollowButton: true },
  ];

  return (
    <>
      <ItemList
        title="Suggestions"
        data={suggestions}
        borderColor={theme.palette.secondary.main}
        action="Voir plus"
        borderRadiusValue="24px 0px 0px 24px"
        borderDirection="borderLeft"
        onActionClick={handleDialogToggle} // ✅ Gestion du clic pour ouvrir le popup
      />

      {/* Popup des suggestions */}
      <SuggestionListPopup 
        open={openDialog} 
        onClose={handleDialogToggle} 
        suggestions={suggestions} 
      />
    </>
  );
};

export default SuggestionList;
