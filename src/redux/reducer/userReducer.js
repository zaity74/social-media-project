// ** ------------------ Reducer des utilisateurs
const getUsersinitialState = {
    users: [],      // Liste des utilisateurs
    loading: false, // Indique si les données sont en cours de chargement
    error: null,    // Message d'erreur en cas d'échec
};

export const getUsersReducer = (state = getUsersinitialState, action) => {
    switch (action.type) {
        case 'GET_USERS_REQUEST':
            return { ...state, loading: true };

        case 'GET_USERS_SUCCESS':
            return { 
                ...state, 
                loading: false, 
                users: action.payload 
            };

        case 'GET_USERS_FAILURE':
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        default:
            return state;
    }
};

// ** ------------------ Reducer Update des utilisateurs

const updateUserinitialState = {
    user: JSON.parse(localStorage.getItem("loginInfo")) || null,
    loading: false,
    error: null,
    successMessage: "",
  };
  
  export const userUpdateReducer = (state = updateUserinitialState, action) => {
    switch (action.type) {
      case "UPDATE_USER_REQUEST":
        return { ...state, loading: true, successMessage: "", error: null };
  
      case "UPDATE_USER_SUCCESS":
        // Met à jour le localStorage avec les nouvelles données de l'utilisateur
        localStorage.setItem("loginInfo", JSON.stringify(action.payload));
        return {
          ...state,
          user: action.payload,
          loading: false,
          successMessage: "Profil mis à jour avec succès.",
        };
  
      case "UPDATE_USER_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  // ** ------------------ Reducer follow & unfollow utilisateur 

  const followInitialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  export const followUserReducer = (state = followInitialState, action) => {
    switch (action.type) {
      case "FOLLOW_USER_REQUEST":
        return { ...state, loading: true };
  
      case "FOLLOW_USER_SUCCESS":
        return {
          ...state,
          loading: false,
          users: state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
          ), // ✅ Met à jour l'utilisateur suivi dans `users`
        };
  
      case "FOLLOW_USER_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  // Unfollow Reducer
  export const unfollowUserReducer = (state = followInitialState, action) => {
    switch (action.type) {
      case "UNFOLLOW_USER_REQUEST":
        return { ...state, loading: true };
  
      case "UNFOLLOW_USER_SUCCESS":
        return {
          ...state,
          loading: false,
          users: state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
          ), // ✅ Met à jour l'utilisateur après unfollow
        };
  
      case "UNFOLLOW_USER_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
