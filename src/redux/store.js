import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userRegisterReducer } from "./reducer/authReducer";
import { userLoginReducer } from "./reducer/authReducer";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer
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