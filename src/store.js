import {applyMiddleware, createStore, combineReducers} from "redux";

import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import users from './reducers/usersReducer';

export default createStore(
    combineReducers({
        users
    }),
    {},
    applyMiddleware(promise(), thunk, logger())
);