import { useTheme } from "@mui/material";
import ItemList from "../utils/List";
import AddIcon from "@mui/icons-material/Add";
import AddTagPopup from "../popups/AddTagPopup";
import { useState } from "react"; // ✅ Assure-toi que ceci est bien présent


const Tags = () => {
  const theme = useTheme();
  
  // State pour la gestion du popup
  const [openDialog, setOpenDialog] = useState(false);
  const [newTag, setNewTag] = useState("");

  // Ouvre/Ferme le popup
  const handleDialogToggle = () => {
    setOpenDialog((prev) => !prev);
  };

  const tags = [
    { username: "Voyages", description: "5 posts", avatar: "/path-to-travel-tag.jpg" },
    { username: "Sciences Fiction", description: "10 posts", avatar: "/path-to-scifi-tag.jpg" },
  ];

  return (
    <>
      <ItemList
        title="Mes Tags"
        data={tags}
        borderColor={theme.palette.secondary.main}
        action="Ajouter"
        addIcon={<AddIcon fontSize="small" />}
        borderRadiusValue="0px 24px 24px 0px"
        borderDirection="borderRight"
        onActionClick={handleDialogToggle} // ✅ Gère le clic sur "Ajouter"
      />

    <AddTagPopup
      open={openDialog}
      onClose={handleDialogToggle}
      value={newTag} 
      onChange={(e) => setNewTag(e.target.value)} 
    />    

</>
  );
};

export default Tags;
