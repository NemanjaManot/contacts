import axios from "axios";

const UserActions = {
    FETCH_USERS_FULFILLED: 'FETCH_USERS_FULFILLED',
    FETCH_USERS_REJECTED: 'FETCH_USERS_REJECTED',
    DELETE_FROM_LIST: 'DELETE_FROM_LIST',
	ADD_NEW_USER: 'ADD_NEW_USER',
	SAVE_EDITED_USER: 'SAVE_EDITED_USER',
	SORT_USER: 'SORT_USER',
	NEXT_PAGINATION: 'NEXT_PAGINATION',
	PREV_PAGINATION: 'PREV_PAGINATION'
};
export default UserActions;

const url = 'https://api.myjson.com/bins/1c9sct';

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

export function sortUser(sort) {
    return {
        type: UserActions.SORT_USER,
        payload: sort
    }
}

export function nextPagination(next) {
    return {
        type: UserActions.NEXT_PAGINATION,
        payload: next
    }
}

export function prevPagination(prev) {
    return {
        type: UserActions.PREV_PAGINATION,
        payload: prev
    }
}