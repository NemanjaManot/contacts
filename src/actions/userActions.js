import UserService from '../services/user-service';

const UserActions = {
    FETCH_USERS_FULFILLED: 'FETCH_USERS_FULFILLED',
    FETCH_USERS_REJECTED: 'FETCH_USERS_REJECTED',
    DELETE_FROM_LIST: 'DELETE_FROM_LIST',
	ADD_NEW_USER: 'ADD_NEW_USER',
	SORT_USER: 'SORT_USER',
	NEXT_PAGINATION: 'NEXT_PAGINATION',
	PAGINATION: 'PAGINATION',
	LOG_IN: 'LOG_IN',
	LOG_OUT: 'LOG_OUT',
	ADD_TO_CONTACTS: 'ADD_TO_CONTACTS',
	REMOVE_FROM_CONTACTS: 'REMOVE_FROM_CONTACTS',
};
export default UserActions;

function fetchUsersFullfiledAction(users) {
    return {
        type: UserActions.FETCH_USERS_FULFILLED,
        users
    };
}

function fetchUsersRejectedAction(error) {
    return {
        type: UserActions.FETCH_USERS_REJECTED,
		error
    };
}

function fetchAddedUsersAction(users) {
    return {
        type: UserActions.ADD_NEW_USER,
        users
    };
}

function fetchDeleteUsersAction(users) {
    return {
        type: UserActions.DELETE_FROM_LIST,
        users
    };
}

export function fetchUsers(dispatch){
    UserService.getAll().then((response) => {
		const users = response.data;
		dispatch(fetchUsersFullfiledAction(users));
	})
	.catch((error) => {
		dispatch(fetchUsersRejectedAction(error));
	});
}

	// DELETE USER (only admin)
export function deleteUser(dispatch, id) {
    UserService.deleteUser(id).then(response => {
        const users = response.data;
        dispatch(fetchDeleteUsersAction(users));
	});
}

	// ADD USER
export function addUser(dispatch, newUser) {
    UserService.addUser(newUser).then((response) => {
    	const users = response.data;
        dispatch(fetchAddedUsersAction(users))
	});
}

	// EDIT USER
export function editUsers(dispatch, editedUser) {
	UserService.updateUser(editedUser).then((response) => {
		const users = response.data;
		dispatch(fetchUsersFullfiledAction(users));
	});
}

	// EDIT USER PROFILE
export function editProfile(dispatch, edit) {
    UserService.updateUser(edit).then((response) => {
        const users = response.data;
        dispatch(fetchUsersFullfiledAction(users));
    });
}

	// CHANGE IMAGE ON PROFILE PAGE
export function changeImage(dispatch, img) {
    UserService.updateUser(img).then((response) => {
        const users = response.data;
        dispatch(fetchUsersFullfiledAction(users));
    });
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