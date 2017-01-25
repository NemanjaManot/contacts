import UserActions from '../actions/userActions';

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
	}

	return state;
}
