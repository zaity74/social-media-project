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

//     const response = await axios.post("https://socialmedy.netlify.app/post", postData, config);

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

    const { data } = await axios.post("https://socialmedy.netlify.app/", postData);

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

    const response = await axios.get("https://socialmedy.netlify.app/post"); 

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
    await axios.delete(`https://socialmedy.netlify.app/post/${postId}`);

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


// * ------------------ // Récupérer et compter les post d'un user
// Récupérer le nombre de posts d'un utilisateur
export const getPostCountByUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POST_COUNT_REQUEST" });

    const { data } = await axios.get(`https://socialmedy.netlify.app/countpost/${userId}`);

    console.log('affiche moi lid :', userId);

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

    const { data } = await axios.get(`https://socialmedy.netlify.app/post/${userId}`);

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


// * ------------------ // Ajouter un like et unliker 

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST, payload: { postId, userId } });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`https://socialmedy.netlify.app/post/like/${postId}`, { userId }, config);

    dispatch({ type: LIKE_POST_SUCCESS, payload: { postId, likes: data.likes } });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de l'ajout du like",
    });
  }
};


export const unlikePost = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: UNLIKE_POST_REQUEST, payload: { postId, userId } });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`https://socialmedy.netlify.app/post/unlike/${postId}`, { userId }, config);

    dispatch({ type: UNLIKE_POST_SUCCESS, payload: { postId, likes: data.likes } });
  } catch (error) {
    dispatch({
      type: UNLIKE_POST_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de la suppression du like",
    });
  }
};


// * ------------------ // Ajouter un like et unliker 
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

export const addComment = (postId, commentData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const { data } = await axios.post(`https://socialmedy.netlify.app/post/comment`, commentData);

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: { postId, comment: data },
    });

    return data; // Retourner le commentaire ajouté
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de l'ajout du commentaire",
    });
  }
};


export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    await axios.delete(`https://socialmedy.netlify.app/delete/comment/${commentId}`);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: { postId, commentId },
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de la suppression du commentaire",
    });
  }
};

export const getComments = (postId) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });

    const { data } = await axios.get(`https://socialmedy.netlify.app/post/comments/${postId}`);

    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: { postId, comments: data },
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: error.response?.data?.error || "Erreur lors du chargement des commentaires",
    });
  }
};


/* ---------------------------- SEARCH POST -------------------- */
export const SEARCH_POSTS_REQUEST = "SEARCH_POSTS_REQUEST";
export const SEARCH_POSTS_SUCCESS = "SEARCH_POSTS_SUCCESS";
export const SEARCH_POSTS_FAILURE = "SEARCH_POSTS_FAILURE";

export const searchPosts = (query, user) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_POSTS_REQUEST });

    let url = `https://socialmedy.netlify.app/search?`;

    if (query) url += `q=${query}&`;
    if (user) url += `user=${user}`;

    const { data } = await axios.get(url);

    dispatch({
      type: SEARCH_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_POSTS_FAILURE,
      payload: error.response?.data?.message || "Erreur lors de la recherche de posts",
    });
  }
};