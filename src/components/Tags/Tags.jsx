import { useTheme } from "@mui/material";
import ItemList from "../utils/List";
import AddIcon from "@mui/icons-material/Add"; // ✅ Import de l'icône "+"

const Tags = () => {
  const theme = useTheme();

  const tags = [
    {
      username: "Voyages",
      description: "5 posts",
      avatar: "/path-to-travel-tag.jpg",
    },
    {
      username: "Sciences Fiction",
      description: "10 posts",
      avatar: "/path-to-scifi-tag.jpg",
    },
  ];

  return (
    <ItemList
      title="Mes Tags"
      data={tags}
      borderColor={theme.palette.secondary.main}
      action="Ajouter"
      addIcon={<AddIcon fontSize="small" />} // ✅ Ajout de l'icône "+"
      borderRadiusValue="0px 24px 24px 0px"
      borderDirection="borderRight"
    />
  );
};

export default Tags;
