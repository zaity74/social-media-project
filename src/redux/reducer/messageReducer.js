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
  
const chatInitialState = {
  conversations: [],
  messagesByConversation: {}, // Changer 'messages' en 'messagesByConversation'
  loading: false,
  error: null,
};

export const messageReducer = (state = chatInitialState, action) => {
  switch (action.type) {
    case FETCH_CONVERSATIONS_REQUEST:
    case FETCH_MESSAGES_REQUEST:
    case SEND_MESSAGE_REQUEST:
    case CREATE_CONVERSATION_REQUEST:
    case DELETE_CONVERSATION_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CONVERSATIONS_SUCCESS:
      return { ...state, loading: false, conversations: action.payload };

    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messagesByConversation: {
          ...state.messagesByConversation,
          [action.payload.conversationId]: action.payload.messages,
        },
      };

    case SEND_MESSAGE_SUCCESS:
      const convId = action.payload.conversationId;
      return {
        ...state,
        loading: false,
        messagesByConversation: {
          ...state.messagesByConversation,
          [convId]: [...(state.messagesByConversation[convId] || []), action.payload],
        },
      };

    case CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: [action.payload, ...state.conversations],
      };

    case DELETE_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: state.conversations.filter(c => c._id !== action.payload),
      };

    case FETCH_CONVERSATIONS_FAILURE:
    case FETCH_MESSAGES_FAILURE:
    case SEND_MESSAGE_FAILURE:
    case CREATE_CONVERSATION_FAILURE:
    case DELETE_CONVERSATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
