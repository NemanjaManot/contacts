import {applyMiddleware, createStore, combineReducers} from "redux";
import createSagaMiddleware from 'redux-saga';

import usersReducer from './reducers/usersReducer';
import conversationReducer from './reducers/conversationReducer';

import usersSaga from './sagas/usersSaga';

const reducer = combineReducers({
    usersReducer,
    conversationReducer
});

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

export function getStore(preloadedState) {
    return createStore(reducer, preloadedState, enhancer);
}

export function startSagas() {
    sagaMiddleware.run(usersSaga);
}