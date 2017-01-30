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

        case UserActions.DELETE_FROM_LIST:
            const users = state.users.filter((user) => {
               return user.id !== action.payload;
            });
            state = Object.assign({}, state, {
                users
            });
            break;

        case UserActions.ADD_NEW_USER:
            //const addedUsers =  state.users.push(action.payload);

            // const addedUsers = state.users.map((user) => {
            //     return user.name == action.payload
            // });

            state = Object.assign({}, state, {
                users: addedUsers
            });
	}

	return state;
}
