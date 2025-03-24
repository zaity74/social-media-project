import axios from "axios";

// 🔹 Types d'actions
export const GET_NOTIFICATIONS_REQUEST = "GET_NOTIFICATIONS_REQUEST";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILURE = "GET_NOTIFICATIONS_FAILURE";

export const CLEAR_NOTIFICATIONS_REQUEST = "CLEAR_NOTIFICATIONS_REQUEST";
export const CLEAR_NOTIFICATIONS_SUCCESS = "CLEAR_NOTIFICATIONS_SUCCESS";
export const CLEAR_NOTIFICATIONS_FAILURE = "CLEAR_NOTIFICATIONS_FAILURE";

// **Récupérer les notifications d'un utilisateur**
export const getNotifications = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_NOTIFICATIONS_REQUEST });

        const response = await axios.get(`https://social-media-project-backend-xv0z.onrender.com/notification/${userId}`);

        dispatch({
            type: GET_NOTIFICATIONS_SUCCESS,
            payload: response.data.notifications, // ✅ Corrigé: correspond à la clé dans la réponse API
        });

    } catch (error) {
        dispatch({
            type: GET_NOTIFICATIONS_FAILURE,
            payload: error.response?.data?.message || "Erreur lors de la récupération des notifications",
        });
    }
};

// **Supprimer toutes les notifications d'un utilisateur**
export const clearNotifications = (userId) => async (dispatch) => {
    try {
      dispatch({ type: CLEAR_NOTIFICATIONS_REQUEST });
  
      await axios.delete(`https://social-media-project-backend-xv0z.onrender.com/notification/delete/${userId}`);
  
      dispatch({ type: CLEAR_NOTIFICATIONS_SUCCESS });
  
      // ✅ Recharger les notifications visibles
      dispatch(getNotifications(userId));
  
      // ✅ Recalculer le compteur des non lues → met à jour LeftNav automatiquement
      dispatch(getUnreadNotificationCount(userId));
  
    } catch (error) {
      dispatch({
        type: CLEAR_NOTIFICATIONS_FAILURE,
        payload: error.response?.data?.message || "Erreur lors de la suppression des notifications",
      });
    }
  };
  


const GET_UNREAD_COUNT_SUCCESS = "GET_UNREAD_COUNT_SUCCESS";

export const getUnreadNotificationCount = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://social-media-project-backend-xv0z.onrender.com/unread-count/${userId}`);
    dispatch({
      type: GET_UNREAD_COUNT_SUCCESS,
      payload: data.unreadCount,
    });
  } catch (error) {
    console.error("Erreur lors du chargement du compteur de notifications non lues :", error);
  }
};