import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import ItemList from "../utils/List"; // ✅ Importation de ItemList

const SuggestionListPopup = ({ open, onClose, suggestions }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxWidth: "280px",
          height: "80vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: "20px",
          pb: 1,
        }}
      >
        Suggestions à suivre
      </DialogTitle>

      <DialogContent sx={{ p: 2, overflowY: "auto" }}>
        {/* Utilisation de ItemList pour afficher les suggestions */}
        <ItemList
          title=""
          data={suggestions}
          borderColor="transparent"
          borderRadiusValue="0"
          borderDirection="borderLeft"
          showFollowButton // ✅ Active le bouton "Suivre" pour chaque item
        />
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionListPopup;
