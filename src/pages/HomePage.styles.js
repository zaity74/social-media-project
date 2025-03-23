import { styled } from "@mui/material/styles"
import { Box, Button, Stack, Menu, MenuItem, Typography } from "@mui/material"

export const SortContainer = styled(Box)(({ theme }) => ({

  display: "flex",
  justifyContent: 'flex-end',
  alignItems: "center",
  width: "100%",
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),

  "&::before": {
    content: '""',
    display: "block",
    width: "60%",
    height: "2px",
    backgroundColor: theme.palette.lightExtra.main,
    marginRight: "10px",
  },
}))

export const SortButton = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "14px",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "8px",
  backgroundColor: theme.palette.secondary.main,
  cursor: "pointer",
  borderRadius: '24px',
  "&:hover": {
    backgroundColor: "transparent",
  },
}))

export const SortIconWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

export const SortMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: 120,
  },
  '& .MuiMenu-list': {
    padding: '8px 0',
  }
}))

export const SortMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const PostsStack = styled(Stack)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
