const iaTreatmentState = {
    payload: null,
    loading: false,
    error: null,
};
 
export const iaTreatmentReducer = (state = iaTreatmentState, action) => {
    switch (action.type) {
        case 'IA_REQUEST':
            return {
                ...state,
            };
        case 'IA_SUCCESS':
            return {
                ...state,
            };
        case 'IA_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};