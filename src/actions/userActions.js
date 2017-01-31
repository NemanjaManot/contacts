import axios from "axios";

const UserActions = {
    FETCH_USERS_FULFILLED: 'FETCH_USERS_FULFILLED',
    FETCH_USERS_REJECTED: 'FETCH_USERS_REJECTED',
    DELETE_FROM_LIST: 'DELETE_FROM_LIST',
	ADD_NEW_USER: 'ADD_NEW_USER',
	SAVE_EDITED_USER: 'SAVE_EDITED_USER'
};
export default UserActions;

const url = 'https://jsonplaceholder.typicode.com/users';

export function fetchUsers(dispatch){
	axios.get(url).then((response) => {
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
		});
}

export function deleteUser(id){
	return {
		type: UserActions.DELETE_FROM_LIST,
		payload: id
	}
}

export function addUser(newUser) {
	return {
		type: UserActions.ADD_NEW_USER,
		payload: newUser
	}
}

export function editUsers(edit) {
    return {
        type: UserActions.SAVE_EDITED_USER,
        payload: edit
    }
}