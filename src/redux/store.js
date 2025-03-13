import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import { userRegisterReducer } from "./reducer/authReducer";
import { iaTreatmentReducer } from "./reducer/iaReducer";
import { userLoginReducer } from "./reducer/authReducer";
import { useReducer } from "react";
import { getUsersReducer } from "./reducer/userReducer";
import { userUpdateReducer } from "./reducer/userReducer";
import { followUserReducer } from "./reducer/userReducer";
import { unfollowUserReducer } from "./reducer/userReducer";
import { createPostReducer } from "./reducer/postReducer";
import { getAllPostReducer } from "./reducer/postReducer";
import { deletePostReducer } from './reducer/postReducer';
import { postCountReducer } from './reducer/postReducer';
import { postsByUserReducer } from './reducer/postReducer';

const rootReducer = combineReducers({
  
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer, 
  getUsers: getUsersReducer,
  updateUser: userUpdateReducer,
  followUser: followUserReducer,
  unfollowUser: unfollowUserReducer,
  createPost : createPostReducer,
  getAllPost : getAllPostReducer,
  deletePoste : deletePostReducer,
  countUserPost : postCountReducer,
  postsByUser : postsByUserReducer
});
 
const initialState = {};
 
const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== "production",
  });
 
  return store;
};
 
export default configureAppStore;