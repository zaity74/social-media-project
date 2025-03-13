import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userRegisterReducer } from "./reducer/authReducer";
import { userLoginReducer } from "./reducer/authReducer";
import { useReducer } from "react";
import { getUsersReducer } from "./reducer/userReducer";
import { userUpdateReducer } from "./reducer/userReducer";
import { followUserReducer } from "./reducer/userReducer";
import { unfollowUserReducer } from "./reducer/userReducer";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer, 
  getUsers: getUsersReducer,
  updateUser: userUpdateReducer,
  followUser: followUserReducer,
  unfollowUser: unfollowUserReducer,
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