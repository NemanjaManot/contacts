import UserActions from '../actions/userActions';

import {firstLetterCapitalize} from '../components/justFunctions';

let initialState = {
	users: [],
	error: null
};

export default function usersReducer(state = initialState, action){
	switch(action.type){
		case UserActions.FETCH_USERS_FULFILLED:
            state = Object.assign({}, state, {
                users: action.payload
            });
            break;

		case UserActions.FETCH_USERS_REJECTED:
            state = Object.assign({}, state, {
                error: action.payload
            });
            break;

        case UserActions.DELETE_FROM_LIST:
            const users = state.users.filter((user) => {
               return user.id !== action.payload;
            });
            state = Object.assign({}, state, {
                users
            });
            break;

        case UserActions.ADD_NEW_USER:
            const addedUsers = state.users.concat(action.payload);
            state = Object.assign({}, state, {
                users: addedUsers
            });
            break;

        case UserActions.SAVE_EDITED_USER:
            const newUsers = state.users.map((user) => {
                if(user.id == action.payload.id){
                    user.name = firstLetterCapitalize(action.payload.name);
                    user.email = action.payload.email;
                }
                return user;
            });
            state = Object.assign({}, state, {
                users: newUsers
            });
            break;

        case UserActions.SORT_USER:
            const sorted = state.users.filter((user) => {
                return user.id !== action.payload;
            });
            state = Object.assign({}, state, {
                users: sorted
            });
	}

	return state;
}