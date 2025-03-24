import axios from "axios";

// * ----------------- LOGIN Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// ** ------------------- LOGIN
export const userLogin = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const response = await axios.post(
        "https://socialmedy.netlify.app/login",
        { email, password },
        config
      );
  
      const { token, user } = response.data;
  
      // Stocker le token et les infos utilisateur
      localStorage.setItem("loginToken", JSON.stringify(token));
      localStorage.setItem("loginInfo", JSON.stringify(user));
  
      dispatch({ type: LOGIN_SUCCESS, payload: user });
  
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Une erreur est survenue";
      dispatch({ type: LOGIN_FAILURE, payload: errorMsg });
      console.error("Erreur lors de la connexion:", errorMsg);
    }
  };

// ** ------------------- LOGOUT 
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("loginInfo");
    dispatch({ type: LOGOUT });
  };

 
// * ----------------- REGISTER
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
 
// **📌 Action Register**
export const userRegister = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_REQUEST" });

        setTimeout(async () => {  // Ajoute un délai artificiel de 1.5s
            const config = { headers: { "Content-Type": "application/json" } };

            const response = await axios.post(
                "https://socialmedy.netlify.app/register",
                { username, email, password },
                config
            );

            // Verifier si la requete renvoie un message de succes
            const successMessage = response.data.message || "Inscription réussie !";

            // Stockage de la reponse en local
            localStorage.setItem("registerUser", JSON.stringify(response.data));

            dispatch({
                type: "REGISTER_SUCCESS",
                payload: { ...response.data, message: successMessage },
            });

        }, 1500); // Ajoute un délai de 1.5 seconde

    } catch (error) {
        const errorMsg = error.response?.data?.error || "Une erreur est survenue";
        dispatch({ type: "REGISTER_FAILURE", payload: errorMsg });
        console.error("Erreur lors de l’inscription:", errorMsg);
    }
};

