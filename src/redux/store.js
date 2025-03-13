import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userRegisterReducer } from "./reducer/authReducer";
import { iaTreatmentReducer } from "./reducer/iaReducer";

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
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