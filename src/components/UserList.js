import React from "react";
import {connect} from "react-redux";

import User from "./User";

import {deleteUser, fetchUsers} from "../actions/userActions";

class UserList extends React.Component {

    componentDidMount(){
        this.props.getUsers();
    }

	render(){
		let userNodes = this.props.users.map((user) => {
			return (
				<User
					name={user.name}
					email={user.email}
					id={user.id}
					key={user.id}
					removeUser={this.props.removeUser}
				>

				</User>
			)
		});
		return (
			<div className="col-lg-5">
				<h1>List</h1>
				<table className="table">
					<thead>
						<tr>
							<th> </th>
							<th>User</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
                    	{userNodes}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
        	fetchUsers(dispatch)
		},
        removeUser: (id) => {
            dispatch(deleteUser(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);