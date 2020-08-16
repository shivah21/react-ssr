export const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":
            return true;
        default: return state;
    }
};

export const missionsReducer = ( state = [ ], action ) => {
    switch ( action.type ) {
        case "STORE_DATA":
            return action.data;
        default: return state;
    }
};

export const filtersReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case "STORE_FILTERS":
            return action.data;
        default: return state;
    }
};