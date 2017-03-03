import UserActions from '../actions/userActions';

let initialState = {
	users: [],
    pageNumber: 1,
    totalPages: 1,
    usersPerPage: 5,
	error: null,
    activeUserToken: '',
    loggedUser: null
};

export default function usersReducer(state = initialState, action){
	switch(action.type){
		case UserActions.FETCH_USERS_FULFILLED:
            const newTotalPages = Math.ceil(action.users.length / state.usersPerPage);
            state = Object.assign({}, state, {
                users: action.users,
                loggedUser: action.users.find(user => user.id == localStorage.getItem('activeUserId')),
                totalPages: Math.ceil(action.users.length / state.usersPerPage),
                pageNumber: newTotalPages < state.pageNumber ? newTotalPages : state.pageNumber
            });
            break;

		case UserActions.FETCH_USERS_REJECTED:
            state = Object.assign({}, state, {
                error: action.error
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
            localStorage.setItem('activeUserId', action.payload.id);
            const logged = state.users.find(user => {
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
                activeUserToken: initialState.activeUserToken,
                loggedUser: null
            });
            break;
	}

	return state;
}