import axios from "axios";

// * ----------------- GET users Action Types
export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

// * ----------------- GET USERS Action
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USERS_REQUEST" });

    const response = await axios.get("https://social-media-project-backend-xv0z.onrender.com/user");
    
    console.log("🛠️ Utilisateurs récupérés depuis l'API :", response.data);

    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_USERS_FAILURE",
      payload: error.response?.data?.error || "Erreur lors de la récupération des utilisateurs",
    });
  }
};

// export const getUsers = () => async (dispatch) => {
//     try {
//         dispatch({ type: GET_USERS_REQUEST });


//         const config = {
//             headers: { "Content-Type": "application/json" }
//         };

//         const response = await axios.get("https://social-media-project-backend-xv0z.onrender.com/user", config);

//         dispatch({ 
//             type: GET_USERS_SUCCESS, 
//             payload: response.data 
//         });

//     } catch (error) {
//         const errorMsg = error.response?.data?.message || "Erreur lors de la récupération des utilisateurs";
//         dispatch({
//             type: GET_USERS_FAILURE,
//             payload: errorMsg
//         });
//         console.error("Erreur lors de la récupération des utilisateurs:", errorMsg);
//     }
// };




// * ----------------- UPDATE users Action Types

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

// ** Action pour Mettre à Jour un Utilisateur**
export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(`https://social-media-project-backend-xv0z.onrender.com/user/${userId}`, userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });

  } catch (error) {
    const errorMsg = error.response?.data?.message || "Une erreur est survenue lors de la mise à jour du profil.";
    dispatch({ type: UPDATE_USER_FAILURE, payload: errorMsg });
    console.error("Erreur lors de la mise à jour du profil :", errorMsg);
  }
};

// * ------------------ FOLLOW = UNFOLLOW 
// Action Types
export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";


// Action Follow User
export const followUser = (userId, targetUserId) => async (dispatch) => {
  try {
    dispatch({ type: "FOLLOW_USER_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.put(
      `https://social-media-project-backend-xv0z.onrender.com/user/follow/${targetUserId}`,
      { userId },
      config
    );

    dispatch({ type: "FOLLOW_USER_SUCCESS", payload: response.data });

    // ✅ Après un follow, recharge la liste des utilisateurs
    dispatch(getUsers());

  } catch (error) {
    dispatch({
      type: "FOLLOW_USER_FAILURE",
      payload: error.response?.data?.error || "Erreur lors du suivi",
    });
  }
};


export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";
// Action Unfollow User
export const unfollowUser = (userId, targetUserId) => async (dispatch) => {
  try {
      dispatch({ type: UNFOLLOW_USER_REQUEST });

      const config = {
          headers: { "Content-Type": "application/json" },
      };

      const response = await axios.put(
          `https://social-media-project-backend-xv0z.onrender.com/user/unfollow/${targetUserId}`,
          { userId: userId }, // ✅ Vérifier que `userId` est bien `_id`
          config
      );

      dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: response.data });

  } catch (error) {
      dispatch({
          type: UNFOLLOW_USER_FAILURE,
          payload: error.response?.data?.error || "Erreur lors du désabonnement",
      });
  }
};
