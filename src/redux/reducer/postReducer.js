// * ------------------ CREATE POST
  
  // État initial du reducer
  const createPostinitialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  // Reducer pour gérer la création de post
  // Reducer pour gérer la création de post
  export const createPostReducer = (state = createPostinitialState, action) => {
    switch (action.type) {
      case "GET_POSTS_REQUEST":
        return { ...state, loading: true };
  
      case "GET_POSTS_SUCCESS":
        return { ...state, posts: action.payload, loading: false };
  
      case "CREATE_POST_SUCCESS":
        return { ...state, posts: [action.payload, ...state.posts] }; // 🔥 Ajoute directement le nouveau post
  
      case "CREATE_POST_FAIL":

      default:
        return state;
    }
  };

  
//   * ---------------------- GET ALL POST 
//  État initial
const getAllPostinitialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  // Reducer pour gérer les posts
export const getAllPostReducer = (state = getAllPostinitialState, action) => {
    switch (action.type) {
      case 'GET_ALL_POSTS_REQUEST':
        return { ...state, loading: true };
  
      case 'GET_ALL_POSTS_SUCCESS':
        return { ...state, loading: false, posts: action.payload };
  
      case 'GET_ALL_POSTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'SEARCH_POSTS_REQUEST':
          return { loading: true, posts: [], error: null };
      case 'SEARCH_POSTS_SUCCESS':
          return { loading: false, posts: action.payload, error: null };
      case 'SEARCH_POSTS_FAILURE':
          return { loading: false, posts: [], error: action.payload };
      default:
        return state;
    }
  };
  
  // ----------------- DELETE POST 
  const deleteInitialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  // Reducer pour la suppression des posts
  export const deletePostReducer = (state = deleteInitialState, action) => {
    switch (action.type) {
      case "DELETE_POST_SUCCESS":
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
        };
  
      case "DELETE_POST_FAIL":
        return { ...state, error: action.payload };
  
      default:
        return state;
    }
  };
  
// * ------------------ COUNT POST
  const postCountInitialState = {
    postCount: 0,
    userPosts: [],
    loading: false,
    error: null,
  };
  
  // Reducer pour récupérer le nombre de posts
  export const postCountReducer = (state = postCountInitialState, action) => {
    switch (action.type) {
      case "GET_POST_COUNT_REQUEST":
        return { ...state, loading: true };
  
      case "GET_POST_COUNT_SUCCESS":
        return { ...state, postCount: action.payload, loading: false };
  
      case "GET_POST_COUNT_FAIL":
        return { ...state, error: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  

  // * ------------------ POST BY USER
  const postByUserInitialState = {
    postCount: 0,
    userPosts: [],
    loading: false,
    error: null,
  };

  // Reducer pour récupérer les posts d'un utilisateur
  export const postsByUserReducer = (state = postByUserInitialState, action) => {
    switch (action.type) {
      case "GET_POSTS_BY_USER_REQUEST":
        return { ...state, loading: true };
  
      case "GET_POSTS_BY_USER_SUCCESS":
        return { ...state, userPosts: action.payload, loading: false };
  
      case "GET_POSTS_BY_USER_FAIL":
        return { ...state, error: action.payload, loading: false };
  
      default:
        return state;
    }
  };


  // * ------------------ LIKE POST 
   const likePostInitialState = {
    posts: [],
    loading: false,
    error: null,
  };
  

// Reducer pour gérer les likes et unlikes
export const postLikeReducer = (state = likePostInitialState, action) => {
  switch (action.type) {
    case 'LIKE_POST_REQUEST':
    case 'UNLIKE_POST_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'LIKE_POST_SUCCESS':
    case 'UNLIKE_POST_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
      };

    case 'LIKE_POST_FAILURE':
    case 'UNLIKE_POST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// * ------------------------ COMMENTAIRES 
const commentPostInitialState = {
  commentsByPost: {}, // Stocke les commentaires par post ID
  loading: false,
  error: null,
};

export const commentReducer = (state = commentPostInitialState, action) => {
  switch (action.type) {
    case 'GET_COMMENTS_REQUEST':
    case 'ADD_COMMENT_REQUEST':
    case 'DELETE_COMMENT_REQUEST':
      return { ...state, loading: true };

    case 'GET_COMMENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        commentsByPost: {
          ...state.commentsByPost,
          [action.payload.postId]: action.payload.comments,
        },
      };

    case 'ADD_COMMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        commentsByPost: {
          ...state.commentsByPost,
          [action.payload.postId]: [
            action.payload.comment,
            ...(state.commentsByPost[action.payload.postId] || []),
          ],
        },
      };

    case 'DELETE_COMMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        commentsByPost: {
          ...state.commentsByPost,
          [action.payload.postId]: state.commentsByPost[action.payload.postId].filter(
            (comment) => comment._id !== action.payload.commentId
          ),
        },
      };

    case 'GET_COMMENTS_FAILURE':
    case 'ADD_COMMENT_FAILURE':
    case 'DELETE_COMMENT_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};