import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import ActionTypes from '../actions/userActions';
import UserService from '../services/user-service';

function* fetchUsers() {
    const fetchedUsersResponse = yield UserService.getAll();
    yield put({
        type: ActionTypes.FETCH_USERS_FULFILLED,
        users: fetchedUsersResponse.data
    });
}

export default function* usersSaga() {
    yield takeEvery(ActionTypes.FETCH_USERS, fetchUsers);
}