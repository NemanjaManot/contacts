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
	REMOVE_FROM_CONTACTS: 'REMOVE_FROM_CONTACTS',
    FETCH_USERS: 'FETCH_USERS'
};
export default UserActions;

function fetchUsersFullfiledAction(users) {
    return {
        type: UserActions.FETCH_USERS_FULFILLED,
        users
    };
}

export function fetchUsers(dispatch){
    dispatch({
        type: UserActions.FETCH_USERS
    });
}

	// DELETE USER (only admin)
export function deleteUser(dispatch, id) {
    UserService.deleteUser(id).then(response => {
        const users = response.data;
        dispatch(fetchUsersFullfiledAction(users));
	});
}

	// ADD USER
export function addUser(dispatch, newUser) {
    UserService.addUser(newUser).then((response) => {
    	const users = response.data;
        dispatch(fetchUsersFullfiledAction(users))
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

    // REMOVE FROM USER CONTACTS
export function removeFromContacts(dispatch, remove) {
    UserService.updateUser(remove).then((response) => {
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