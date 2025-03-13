

const registerUserStorage = JSON.parse(localStorage.getItem("registerUser")) || null;

// ** -------------------------------- REGISTER
const initialRegisterState = {
    user: registerUserStorage,
    loading: false,
    error: null,
    isRegistered: !!registerUserStorage,
    successMessage: null,  
};

export const userRegisterReducer = (state = initialRegisterState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return { ...state, loading: true, successMessage: null, error: null };

        case 'REGISTER_SUCCESS':
            return { 
                ...state, 
                loading: false, 
                user: action.payload, 
                isRegistered: true, 
                successMessage: action.payload.message 
            };

        case 'REGISTER_FAILURE':
            return { 
                ...state, 
                loading: false, 
                error: action.payload, 
                isRegistered: false, 
                successMessage: null
            };

        default:
            return state;
    }
};

// ** ---------------------------------- LOGIN 
// Récupération des données du localStorage
const loginTokenStorage = JSON.parse(localStorage.getItem("loginToken")) || null;
const loginInfoStorage = JSON.parse(localStorage.getItem("loginInfo")) || null;

const initialState = {
    user: loginInfoStorage, 
    loading: false,
    error: null,
    isLogin: !!loginInfoStorage, // Convertir en booléen
};

export const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, loading: true };

        case "LOGIN_SUCCESS":
            return { 
                ...state, 
                loading: false, 
                user: action.payload, 
                isLogin: true 
            };

        case "LOGIN_FAILURE":
            return { 
                ...state, 
                loading: false, 
                error: action.payload, 
                isLogin: false 
            };

        case "LOGOUT":
            return { 
                ...state, 
                user: null, 
                isLogin: false 
            };

        default:
            return state;
    }
};
