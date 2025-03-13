// * ------------------ CREATE POST
  
  // État initial du reducer
  const createPostinitialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  // Reducer pour gérer la création de post
  export const createPostReducer = (state = createPostinitialState, action) => {
    switch (action.type) {
      case 'CREATE_POST_REQUEST':
        return { ...state, loading: true };
  
      case 'CREATE_POST_SUCCESS':
        return {
          ...state,
          loading: false,
          posts: [action.payload, ...state.posts], // Ajoute le nouveau post en haut
        };
  
      case 'CREATE_POST_FAILURE':
        return { ...state, loading: false, error: action.payload };
  
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
  
      default:
        return state;
    }
  };
  