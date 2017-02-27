import axios from "axios";

const UserActions = {
    FETCH_USERS_FULFILLED: 'FETCH_USERS_FULFILLED',
    FETCH_USERS_REJECTED: 'FETCH_USERS_REJECTED',
    DELETE_FROM_LIST: 'DELETE_FROM_LIST',
	ADD_NEW_USER: 'ADD_NEW_USER',
	SAVE_EDITED_USER: 'SAVE_EDITED_USER',
	SORT_USER: 'SORT_USER',
	NEXT_PAGINATION: 'NEXT_PAGINATION',
	PAGINATION: 'PAGINATION',
	LOG_IN: 'LOG_IN',
	LOG_OUT: 'LOG_OUT',
	SAVE_PROFILE_CHANGES: 'SAVE_PROFILE_CHANGES',
	CHANGE_IMAGE: 'CHANGE_IMAGE',
	ADD_TO_CONTACTS: 'ADD_TO_CONTACTS',
	REMOVE_FROM_CONTACTS: 'REMOVE_FROM_CONTACTS'
};
export default UserActions;

const url = 'https://api.myjson.com/bins/jdfvx';

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

export function editProfile(edit) {
	return {
		type: UserActions.SAVE_PROFILE_CHANGES,
		payload: edit
	}
}

export function changeImage(img) {
	return {
		type: UserActions.CHANGE_IMAGE,
		payload: img
	}
}

export function sortUser(sort) {
    return {
        type: UserActions.SORT_USER,
        payload: sort
    }
}

export function pagination(pag) {
    return {
        type: UserActions.PAGINATION,
        payload: pag
    }
}

export function loginUser(token) {
    return {
        type: UserActions.LOG_IN,
        payload: token
    }
}

export function logoutUser() {
    return {
        type: UserActions.LOG_OUT
    }
}

export function addContacts(add) {
    return {
        type: UserActions.ADD_TO_CONTACTS,
        payload: add
    }
}

export function removeFromContacts(remove) {
    return {
        type: UserActions.REMOVE_FROM_CONTACTS,
        payload: remove
    }
}