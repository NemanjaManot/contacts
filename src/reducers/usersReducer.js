import UserActions from '../actions/userActions';

import {firstLetterCapitalize} from '../components/justFunctions';

let initialState = {
	users: [],
    pageNumber: 1,
    totalPages: 1,
    usersPerPage: 5,
	error: null,
    activeUserToken: '',
    loggedUser: []
};

export default function usersReducer(state = initialState, action){
	switch(action.type){
		case UserActions.FETCH_USERS_FULFILLED:
            state = Object.assign({}, state, {
                users: action.payload,
                totalPages: Math.ceil(action.payload.length / state.usersPerPage)
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
            const newTotalPages = Math.ceil((state.users.length - 1) / state.usersPerPage);
            state = Object.assign({}, state, {
                users,
                totalPages: newTotalPages,
                pageNumber: newTotalPages < state.pageNumber ? newTotalPages : state.pageNumber
            });
            break;

        case UserActions.ADD_NEW_USER:
            const addedUsers = state.users.concat(action.payload);
            state = Object.assign({}, state, {
                users: addedUsers,
                totalPages: Math.ceil((state.users.length +1) / state.usersPerPage)
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
            state = Object.assign({}, state, {
                users: action.payload.map(user => user)
            });
            break;

            /* -- -- PAGINATION -- -- */
        case UserActions.PAGINATION:
            state = Object.assign({}, state, {
                pageNumber: action.payload
            });
            break;

            /* -- -- LOG IN -- -- */
        case UserActions.LOG_IN:
            localStorage.setItem('activeUserToken', action.payload.token);
            localStorage.setItem('username', action.payload.username);
            const logged = state.users.filter(user => {
                return user.id == action.payload.id
            });

            state = Object.assign({}, state, {
                activeUserToken: action.payload.token,
                loggedUser: logged
            });
            break;

        /* -- -- LOG OUT -- -- */
        case UserActions.LOG_OUT:
            localStorage.clear();
            state = Object.assign({}, state, {
                activeUserToken: initialState.activeUserToken
            });
	}

	return state;
}