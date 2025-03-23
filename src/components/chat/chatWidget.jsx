import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Avatar, Typography, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useUser } from "../../context/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete"; // Icône de suppression
import io from "socket.io-client";
import { fetchConversations, fetchMessages, sendMessage, createConversation, deleteConversation } from "../../redux/action/messageActions";
import toast from "react-hot-toast"; // Pour afficher les notifications
import ChatIcon from "@mui/icons-material/Chat";
import { ChatContainer, ChatBar, ConversationListPaper, MessageDialog, MessagesContainer, MessageContainer, Message, MessageInputSection, MessageInput, SendButton, AvatarStyled, StyledDialog } from "./ChatWidget.styles";

const socket = io("http://localhost:8081");

const ChatWidget = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { conversations = [], messagesByConversation = {}, loading } = useSelector((state) => state.userMessage);
  const { users = [] } = useSelector((state) => state.getUsers);

  const [openList, setOpenList] = useState(false);
  const [openChatId, setOpenChatId] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [newMessageCount, setNewMessageCount] = useState({}); // Compteur de messages non lus
  const [isTyping, setIsTyping] = useState(false); // Pour savoir si l'utilisateur tape
  const [typingUser, setTypingUser] = useState(null); // Utilisateur qui tape
  const [selectedUser, setSelectedUser] = useState(null);
  const scrollRef = useRef();

  const currentMessages = openChatId ? messagesByConversation[openChatId] || [] : [];

  // Suppression d'une conversation
  const handleDeleteConversation = (conversationId) => {
    dispatch(deleteConversation(conversationId)); // Suppression via Redux
    setOpenChatId(null); // Fermer la conversation actuelle
    toast.success("Conversation supprimée");
  };


  // Ecouter la réception de messages et afficher l'état "en train d'écrire"
    useEffect(() => {
        if (user?._id) {
        dispatch(fetchConversations(user._id));
        socket.emit("join", user._id);  // Notify the server that the user is online
        }
    
        socket.on("receiveMessage", (data) => {
        if (data.conversationId === openChatId) {
            dispatch(fetchMessages(openChatId));  // Mise à jour des messages dans la conversation actuelle
        } else {
            setNewMessageCount((prevCount) => ({
            ...prevCount,
            [data.conversationId]: (prevCount[data.conversationId] || 0) + 1,
            }));
            toast.success("Nouveau message de " + data.sender.username); // Notification via toast
        }
        });
    
        socket.on("typing", (data) => {
        if (data.conversationId === openChatId) {
            setTypingUser(data.userId); // Afficher l'utilisateur qui tape
        }
        });
    
        socket.on("stopTyping", (data) => {
        if (data.conversationId === openChatId) {
            setTypingUser(null); // Cacher l'utilisateur qui tape
        }
        });
    
        return () => {
        socket.disconnect();
        };
    }, [dispatch, user, openChatId]);

  // Fonction pour envoyer un message
    const handleSendMessage = () => {
        if (!messageText.trim()) return;
    
        const message = {
        conversationId: openChatId,
        sender: user._id,
        text: messageText,
        author: user._id,
        };
    
        dispatch(sendMessage(message));  // Envoi du message via Redux
        socket.emit("sendMessage", { ...message, receiverId: getReceiverId(openChatId) });  // Envoie du message en temps réel
    
        setMessageText("");  // Réinitialiser le champ de texte après l'envoi
    
        // Mise à jour immédiate des messages sans recharger la page
        dispatch(fetchMessages(openChatId));  // Rafraîchir les messages de cette conversation
    };

  const getReceiverId = (conversationId) => {
    const conv = conversations.find((c) => c._id === conversationId);
    return conv?.members?.find((id) => id !== user._id);
  };

  // Vérifier que l'utilisateur ou le destinataire est bien défini avant d'accéder à ses propriétés
  const getReceiverAvatar = () => {
    const conv = conversations.find((c) => c._id === openChatId);
    const receiverId = conv?.members?.find((id) => id !== user._id);
    const receiver = users.find((usr) => usr._id === receiverId);
    return receiver?.avatar || '/default-avatar.png';  // Retourner un avatar par défaut si non défini
  };

  // Fonction pour obtenir le nom de l'utilisateur destinataire
  const getReceiverName = () => {
    const conv = conversations.find((c) => c._id === openChatId);
    const receiverId = conv?.members?.find((id) => id !== user._id);
    const receiver = users.find((usr) => usr._id === receiverId);
    return receiver?.username || 'Utilisateur';  // Retourner un nom par défaut si non défini
  };

  // Gérer l'ouverture de la conversation
  const handleOpenChat = (conversationId) => {
    setOpenChatId(conversationId);
    setOpenList(false);
    dispatch(fetchMessages(conversationId));
    setNewMessageCount((prevCount) => ({
      ...prevCount,
      [conversationId]: 0,
    }));
  };

  // Créer une nouvelle conversation
  const handleCreateConversation = async (receiverId) => {
    try {
      await dispatch(createConversation(user._id, receiverId));
      setOpenList(false);
      toast.success("Conversation créée !");
      const newConversation = conversations.find((conv) => conv.members.includes(receiverId));
      setOpenChatId(newConversation?._id);
    } catch (err) {
      toast.error("Erreur lors de la création de la conversation.");
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUser(userId);  // Utilisateur sélectionné pour démarrer la conversation
    handleCreateConversation(userId); // Créer une conversation avec cet utilisateur
  };
  // Indiquer qu'un utilisateur est en train de taper
  const handleTyping = (e) => {
    setMessageText(e.target.value);
    if (e.target.value.trim()) {
      setIsTyping(true);
      socket.emit("typing", { conversationId: openChatId, userId: user._id });
    } else {
      setIsTyping(false);
      socket.emit("stopTyping", { conversationId: openChatId, userId: user._id });
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  return (
    <ChatContainer>
      {/* Liste des utilisateurs */}
      {openList && (
        <ConversationListPaper>
          <Typography variant="h6" mb={1}>Utilisateurs disponibles</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            users.map((usr) => (
              <Box key={usr._id} onClick={() => handleUserSelection(usr._id)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 1 }}>
                <AvatarStyled src={usr.avatar} />
                <Typography sx={{ ml: 1 }}>{usr.username}</Typography>
              </Box>
            ))
          )}
        </ConversationListPaper>
      )}

      {/* Liste des conversations */}
      <ConversationListPaper>
        <Typography variant="h6" mb={1}>Conversations</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          conversations.map((conv) => (
            <Box key={conv._id} onClick={() => handleOpenChat(conv._id)} sx={{ display: "flex", alignItems: "center", cursor: "pointer", mb: 1 }}>
              <AvatarStyled src={conv.participant?.avatar || '/default-avatar.png'} />
              <Typography sx={{ ml: 1 }}>
                {conv.participant?.username || 'Utilisateur'}
                {newMessageCount[conv._id] > 0 && (
                  <span style={{
                    color: 'white', 
                    backgroundColor: 'red', 
                    borderRadius: '50%', 
                    padding: '3px 8px',
                    marginLeft: '5px',
                    fontSize: '12px',
                  }}>
                    {newMessageCount[conv._id]}
                  </span>
                )}
              </Typography>
              {/* Bouton de suppression */}
              <IconButton onClick={() => handleDeleteConversation(conv._id)} color="secondary" size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </ConversationListPaper>

      {/* Barre de chat */}
      <ChatBar onClick={() => setOpenList((prev) => !prev)}>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center" gap={1}>
            <AvatarStyled src={user?.avatar} />
            <Typography fontWeight={600}>Messagerie</Typography>
          </Box>
          <ChatIcon color="primary" />
        </Box>
      </ChatBar>

      {/* Fenêtre de conversation */}
      {openChatId && (
        <StyledDialog open onClose={() => setOpenChatId(null)}>
          <MessageDialog>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={1}>
                <AvatarStyled src={getReceiverAvatar()} />
                <Typography variant="h6">{getReceiverName()}</Typography>
              </Box>
              <IconButton onClick={() => setOpenChatId(null)}><CloseIcon /></IconButton>
            </Box>

            <MessagesContainer>
              {currentMessages.map((msg) => (
                <MessageContainer key={msg._id}>
                  <AvatarStyled src={msg.sender.avatar} />
                  <Message isSender={msg.sender._id === user._id}>
                    <Typography variant="body2" sx={{ fontWeight: msg.sender._id === user._id ? "bold" : "normal" }}>
                      {msg.sender.username}: {msg.text}
                    </Typography>
                  </Message>
                </MessageContainer>
              ))}
              {typingUser && typingUser !== user._id && (
                <Typography variant="body2" sx={{ color: "gray", fontStyle: "italic" }}>
                  {getReceiverName()} est en train d'écrire...
                </Typography>
              )}
              <div ref={scrollRef}></div>
            </MessagesContainer>

            <MessageInputSection>
              <MessageInput
                value={messageText}
                onChange={handleTyping}
                fullWidth
                size="small"
                placeholder="Écrivez un message..."
              />
              <SendButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </SendButton>
            </MessageInputSection>
          </MessageDialog>
        </StyledDialog>
      )}
    </ChatContainer>
  );
};

export default ChatWidget;
