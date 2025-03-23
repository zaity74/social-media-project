import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { Avatar, Typography, IconButton, CircularProgress, Dialog, TextField } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";



export const ChatContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "0px",
  right: "20px",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  width: "380px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
}));

export const ChatBar = styled(Paper)(({ theme }) => ({
  padding: "12px",
  backgroundColor: "#f8f8f8",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  borderRadius: "8px 8px 0 0",
  "&:hover": {
    backgroundColor: "#ececec",
  },
}));

export const ConversationListPaper = styled(Paper)(({ theme }) => ({
  padding: "16px",
  maxHeight: "300px",
  overflowY: "auto",
  borderRadius: "0 0 10px 10px",
}));

export const ConversationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px 0",
  cursor: "pointer",
  borderBottom: "1px solid #e1e1e1",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));

export const StyledDialog = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 'auto',
  padding: '20px',
  position: "absolute",
  bottom: 0,
  right: "100%",
  borderRadius: "0px",
  backgroundColor: "white",
}));

export const MessageDialog = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));


export const MessagesContainer = styled(Box)(({ theme }) => ({
  maxHeight: "350px",
  overflowY: "auto",
  padding: "20px 0px",
  marginBottom: "16px",
}));

export const MessageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "12px",
  gap: "10px",
  alignItems: "center",
}));

export const Message = styled(Box)(({ theme, isSender }) => ({
  padding: "10px",
  backgroundColor: isSender ? "#d1e7f0" : "#f1f1f1",
  borderRadius: "8px",
  maxWidth: "70%",
  marginLeft: isSender ? "auto" : "0",
}));

export const MessageInputSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

export const MessageInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#0e76a8",
  color: "white",
  padding: "8px 12px",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#065d75",
  },
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
}));
