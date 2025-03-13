import { userRegisterReducer } from "./reducer/authReducer";
import { iaTreatmentReducer } from "./reducer/iaReducer";
import { userLoginReducer } from "./reducer/authReducer";
import { useReducer } from "react";
import { getUsersReducer } from "./reducer/userReducer";
import { userUpdateReducer } from "./reducer/userReducer";
import { followUserReducer } from "./reducer/userReducer";
import { unfollowUserReducer } from "./reducer/userReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer, 
  getUsers: getUsersReducer,
  updateUser: userUpdateReducer,
  followUser: followUserReducer,
  unfollowUser: unfollowUserReducer,
  iaTreatment : iaTreatmentReducer
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