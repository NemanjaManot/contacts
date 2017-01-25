import axios from "axios";

const UserActions = {
    FETCH_USERS_FULFILLED: 'FETCH_USERS_FULFILLED',
    FETCH_USERS_REJECTED: 'FETCH_USERS_REJECTED'
};

export default UserActions;


export function fetchUsers(){
	return function(dispatch){
		axios.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				dispatch({
					type: UserActions.FETCH_USERS_FULFILLED,
					payload: response.data
				});
			})
			.catch((err) => {
				dispatch({
					type: UserActions.FETCH_USERS_REJECTED,
					payload: err
				});
			})
	}
}