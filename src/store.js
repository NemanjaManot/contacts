import {applyMiddleware, createStore, combineReducers} from "redux";

import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import usersReducer from './reducers/usersReducer';

export default createStore(
    combineReducers({
        usersReducer
    }),
    {},
    applyMiddleware(promise(), thunk, logger())
);