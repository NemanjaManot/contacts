import UserActions from '../actions/userActions';

let initialState = {
	users: [],
    pageNumber: 1,
    totalPages: 1,
    usersPerPage: 5,
	error: null,
    activeUserToken: '',
    loggedUser: null,
    contactsList: []
};

export default function usersReducer(state = initialState, action){
	switch(action.type){
		case UserActions.FETCH_USERS_FULFILLED:
            state = Object.assign({}, state, {
                users: action.users,
                loggedUser: action.users.find(user => user.id == localStorage.getItem('activeUserId')),
                totalPages: Math.ceil(action.users.length / state.usersPerPage)
            });
            break;

		case UserActions.FETCH_USERS_REJECTED:
            state = Object.assign({}, state, {
                error: action.error
            });
            break;

        case UserActions.ADD_NEW_USER:
            state = Object.assign({}, state, {
                users: action.users,
                totalPages: Math.ceil((state.users.length +1) / state.usersPerPage)
            });
            break;

        case UserActions.DELETE_FROM_LIST:
            const newTotalPages = Math.ceil((state.users.length - 1) / state.usersPerPage);
            state = Object.assign({}, state, {
                users: action.users,
                totalPages: newTotalPages,
                pageNumber: newTotalPages < state.pageNumber ? newTotalPages : state.pageNumber
            });
            break;



        //     /* Profile changes */
        // case UserActions.SAVE_PROFILE_CHANGES:
        //     const changedUsers = state.users.map((user) => {
        //         if(user.id == action.payload.id){
        //             user.name = action.payload.name;
        //             user.email = action.payload.email;
        //             user.username = action.payload.username;
        //             user.password = action.payload.password;
        //             user.phone = action.payload.phone;
        //             user.website = action.payload.website;
        //             user.company.name = action.payload.companyName;
        //             user.address.city = action.payload.addressCity;
        //             user.address.street = action.payload.addressStreet;
        //         }
        //         return user;
        //     });
        //     state = Object.assign({}, state, {
        //         users: changedUsers
        //     });
        //     break;


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

        /* -- -- ADD CONTACTS -- -- */
        case UserActions.ADD_TO_CONTACTS:
            const newContacts = state.contactsList.concat(action.payload);
            state = Object.assign({}, state, {
                contactsList: newContacts
            });
            break;

        case UserActions.REMOVE_FROM_CONTACTS:
            const removedUsers = state.contactsList.filter(user => {
                return user.id !== action.payload;
            });
            state = Object.assign({}, state, {
                contactsList: removedUsers
            });
	}

	return state;
}