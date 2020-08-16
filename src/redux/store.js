import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { fetchMissions } from "./api";
export { initializeSession } from './actions';
export {
    storeData,
    storeFilters
} from './actions';
import {
    sessionReducer,
    missionsReducer,
    filtersReducer
} from './reducers';

const reducer = combineReducers({
    loggedIn: sessionReducer,
    missions: missionsReducer,
    filters: filtersReducer
});

export default (initialState) =>
    createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
