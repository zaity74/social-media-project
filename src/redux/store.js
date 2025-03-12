import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userRegister } from "./action/authAction";
import { userRegisterReducer } from "./reducer/authReducer";

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
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