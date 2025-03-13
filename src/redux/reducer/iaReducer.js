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
                loading: true
            };
        case 'IA_SUCCESS':
            return {
                ...state,
                loading: false,
                payload: action.payload,
            };
        case 'IA_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};