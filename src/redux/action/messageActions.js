import axios from "axios";

// ⬇Types d'action
export const FETCH_CONVERSATIONS_REQUEST = "FETCH_CONVERSATIONS_REQUEST";
export const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
export const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";

export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const CREATE_CONVERSATION_REQUEST = "CREATE_CONVERSATION_REQUEST";
export const CREATE_CONVERSATION_SUCCESS = "CREATE_CONVERSATION_SUCCESS";
export const CREATE_CONVERSATION_FAILURE = "CREATE_CONVERSATION_FAILURE";

export const DELETE_CONVERSATION_REQUEST = "DELETE_CONVERSATION_REQUEST";
export const DELETE_CONVERSATION_SUCCESS = "DELETE_CONVERSATION_SUCCESS";
export const DELETE_CONVERSATION_FAILURE = "DELETE_CONVERSATION_FAILURE";

// Récupérer les conversations
export const fetchConversations = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_CONVERSATIONS_REQUEST });
  try {
    const { data } = await axios.get(`http://localhost:8081/conversations/${userId}`);
    dispatch({ type: FETCH_CONVERSATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CONVERSATIONS_FAILURE,
      payload: error.response?.data?.error || "Erreur lors du chargement des conversations",
    });
  }
};

// Récupérer les messages d’une conversation
export const fetchMessages = (conversationId) => async (dispatch) => {
  dispatch({ type: FETCH_MESSAGES_REQUEST });
  try {
    const { data } = await axios.get(`http://localhost:8081/${conversationId}`);
    dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: { conversationId, messages: data } });
  } catch (error) {
    dispatch({
      type: FETCH_MESSAGES_FAILURE,
      payload: error.response?.data?.error || "Erreur lors du chargement des messages",
    });
  }
};

// Envoyer un message
export const sendMessage = (message) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });

  // Préparer l'objet message en ajoutant l'attribut author
  const modifiedMessage = {
    conversationId: message.conversationId,  // ID de la conversation
    sender: message.sender,  // ID de l'expéditeur
    text: message.text,  // Le texte du message
    author: message.author,  // Assurez-vous que l'ID de l'auteur est passé ici
  };
  
  console.log('modified message', modifiedMessage);

  try {
    const { data } = await axios.post("http://localhost:8081/send", modifiedMessage, {
      headers: {
        'Content-Type': 'application/json',  // Indiquer que les données sont envoyées en JSON
      },
    });
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de l’envoi du message",
    });
    console.log('erreur', error);
  }
};




// Créer une conversation
export const createConversation = (senderId, receiverId) => async (dispatch) => {
  dispatch({ type: CREATE_CONVERSATION_REQUEST });
  try {
    const { data } = await axios.post(`http://localhost:8081/conversations`, {
      senderId,
      receiverId,
    });
    dispatch({ type: CREATE_CONVERSATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CONVERSATION_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de la création de la conversation",
    });
  }
};

// Supprimer une conversation
export const deleteConversation = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CONVERSATION_REQUEST });
  try {
    await axios.delete(`http://localhost:8081/conversations/${id}`);
    dispatch({ type: DELETE_CONVERSATION_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_CONVERSATION_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de la suppression de la conversation",
    });
  }
};
