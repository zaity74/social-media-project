// * ---------------------- NOTIFICATIONS USER

const notificationInitialState = {
    notifications: [],
    loading: false,
    error: null,
    unreadCount: null,
};

// **Reducer des notifications**
export const notificationReducer = (state = notificationInitialState, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATIONS_REQUEST':
        case 'CLEAR_NOTIFICATIONS_REQUEST':
            return {
                ...state,
                loading: true,
            };

        case 'GET_NOTIFICATIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                notifications: action.payload,
            };

        case 'CLEAR_NOTIFICATIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                notifications: [],
            };

        case 'GET_NOTIFICATIONS_FAILURE':
        case 'CLEAR_NOTIFICATIONS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'GET_UNREAD_COUNT_SUCCESS':
            return {
                ...state,
                unreadCount: action.payload,
            };

        default:
            return state;
    }
};


// * ---------------------- COUNT NOTIFICATIONS USER