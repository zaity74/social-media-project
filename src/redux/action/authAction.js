import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Action Types
export const LOGIN_REQUEST = 'REGISTER_REQUEST';
export const LOGIN_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_FAILURE = 'REGISTER_FAILURE';
 
// Register Action
export const userLogin= (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
 
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
 
        const response = await axios.post(
            'http://localhost:8081/api/v1/register',
            { username, email, password },
            config
        );
 
        // Sauvegarde des infos utilisateur dans le localStorage
        localStorage.setItem("registerUser", JSON.stringify(response.data));
 
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
 
    } catch (error) {
        const errorMsg = error.response && error.response.data.error
            ? error.response.data.error
            : "Une erreur est survenue";
 
        dispatch({
            type: REGISTER_FAILURE,
            payload: errorMsg,
        });
        console.error('Erreur lors de l’inscription:', errorMsg);
    }
};

 
// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
 
// Register Action
export const userRegister = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
 
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
 
        const response = await axios.post(
            'http://localhost:8081/api/v1/register',
            { username, email, password },
            config
        );
 
        // Sauvegarde des infos utilisateur dans le localStorage
        localStorage.setItem("registerUser", JSON.stringify(response.data));
 
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
 
    } catch (error) {
        const errorMsg = error.response && error.response.data.error
            ? error.response.data.error
            : "Une erreur est survenue";
 
        dispatch({
            type: REGISTER_FAILURE,
            payload: errorMsg,
        });
        console.error('Erreur lors de l’inscription:', errorMsg);
    }
};