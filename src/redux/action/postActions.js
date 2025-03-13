import axios from "axios";

// 🎯 Types d'actions
export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

// // Action pour créer un post
// export const createPost = (postData) => async (dispatch) => {
//   try {
//     dispatch({ type: CREATE_POST_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const response = await axios.post("http://localhost:8081/post", postData, config);

//     dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({
//       type: CREATE_POST_FAILURE,
//       payload: error.response?.data?.error || "Erreur lors de la création du post",
//     });
//   }
// };

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const { data } = await axios.post("http://localhost:8081/", postData);

    console.log("Réponse API :", data); 
    
    dispatch({ type: "CREATE_POST_SUCCESS", payload: data });

    return data; // On retourne les données pour les utiliser immédiatement
  } catch (error) {
    dispatch({ type: "CREATE_POST_FAIL", payload: error.message });
    throw error; // On relance l'erreur pour la gérer dans `CreatePost.jsx`
  }
};

// * ---------------- GET ALL POST 
export const GET_ALL_POSTS_REQUEST = "GET_ALL_POSTS_REQUEST";
export const GET_ALL_POSTS_SUCCESS = "GET_ALL_POSTS_SUCCESS";
export const GET_ALL_POSTS_FAILURE = "GET_ALL_POSTS_FAILURE";

// Action pour récupérer tous les posts
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POSTS_REQUEST });

    const response = await axios.get("http://localhost:8081/post"); 

    dispatch({
      type: GET_ALL_POSTS_SUCCESS,
      payload: response.data, 
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSTS_FAILURE,
      payload: error.response?.data?.message || "Erreur lors du chargement des posts",
    });
  }
};


// * ------------------ // Supprimer un post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8081/post/${postId}`);

    dispatch({
      type: "DELETE_POST_SUCCESS",
      payload: postId,
    });

    return postId; 
  } catch (error) {
    console.error("Erreur lors de la suppression du post", error);
    dispatch({
      type: "DELETE_POST_FAIL",
      payload: error.response?.data?.message || "Erreur serveur",
    });
    throw error; 
  }
};


// Récupérer le nombre de posts d'un utilisateur
export const getPostCountByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POST_COUNT_REQUEST" });

    const { data } = await axios.get(`http://localhost:8081/countpost/${userId}`);

    dispatch({
      type: "GET_POST_COUNT_SUCCESS",
      payload: data.count,
    });
  } catch (error) {
    dispatch({
      type: "GET_POST_COUNT_FAIL",
      payload: error.response?.data?.message || "Erreur lors du chargement",
    });
  }
};

// Récupérer les posts d'un utilisateur
export const getPostsByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POSTS_BY_USER_REQUEST" });

    const { data } = await axios.get(`http://localhost:8081/post/${userId}`);

    dispatch({
      type: "GET_POSTS_BY_USER_SUCCESS",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "GET_POSTS_BY_USER_FAIL",
      payload: error.response?.data?.message || "Erreur lors du chargement",
    });
  }
};