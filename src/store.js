import {applyMiddleware, createStore, combineReducers} from "redux";

import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import {routerReducer} from 'react-router-redux'

import usersReducer from './reducers/usersReducer';
import conversationReducer from './reducers/conversationReducer';

export default createStore(
    combineReducers({
        usersReducer,
        conversationReducer,
        routing: routerReducer
    }),
    {},
    applyMiddleware(promise(), thunk, logger())
);