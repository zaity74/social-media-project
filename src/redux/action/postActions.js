import axios from "axios";

// 🎯 Types d'actions
export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

// ✅ Action pour créer un post
export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.post("http://localhost:8081/post", postData, config);

    dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAILURE,
      payload: error.response?.data?.error || "Erreur lors de la création du post",
    });
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