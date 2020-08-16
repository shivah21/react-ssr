export const initializeSession = () => ( {
    type: "INITIALIZE_SESSION",
} );

export const storeData = ( data ) => ( {
    type: "STORE_DATA",
    data,
} );

export const storeFilters = ( data ) => ( {
    type: "STORE_FILTERS",
    data,
} );