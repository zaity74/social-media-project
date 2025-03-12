// ------------------------ REGISTER -----------------------------------------------------
const registerUserStorage = localStorage.getItem("registerUser")
    ? JSON.parse(localStorage.getItem("registerUser"))
    : null;
 
const userRegisterState = {
    user: registerUserStorage,
    loading: false,
    error: null,
    isRegister: !!registerUserStorage,
};
 
export const userRegisterReducer = (state = userRegisterState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                isRegister: true,
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                isRegister: false,
            };
        default:
            return state;
    }
};
// ------------------------ LOGIN -----------------------------------------------------
const userLoginState = {
    user: registerUserStorage,
    loading: false,
    error: null,
    isRegister: !!registerUserStorage,
};
 
export const userLoginReducer = (state = userRegisterState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                isRegister: true,
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                isRegister: false,
            };
        default:
            return state;
    }
};