import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import ItemList from "../utils/List"; // ✅ Utilisation du composant générique

const ActivityListPopup = ({ open, onClose, activities, title = "Toutes les activités" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxWidth: "300px",
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
        {title}
      </DialogTitle>

      <DialogContent sx={{ p: 2, overflowY: "auto" }}>
        {/* ✅ Réutilisation d'ItemList pour afficher les activités */}
        <ItemList
          title="" // Pas besoin d'afficher un titre supplémentaire
          data={activities}
          borderColor="transparent"
          borderRadiusValue="0"
          borderDirection="borderLeft"
          showFollowButton // ✅ Active le bouton "Suivre" si nécessaire
        />
      </DialogContent>
    </Dialog>
  );
};

export default ActivityListPopup;
