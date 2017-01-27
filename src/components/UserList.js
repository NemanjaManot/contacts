import React from "react";
import {connect} from "react-redux";

import User from "./User";

import {deleteUser, fetchUsers} from "../actions/userActions";

class UserList extends React.Component {

    componentDidMount(){
        this.props.getUsers();
        this.state = {
        	searchValue: ''
        };
    }

    search(){
        let searchInput = document.getElementById("searchTxt").value;
		this.setState({
			searchValue: searchInput
		})
	}

	render(){
    	let searchedUsers = this.props.users.filter((user) => {
			return user.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    	});

		let userNodes = searchedUsers.map((user) => {
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
				<input
					onChange={this.search.bind(this)}
					id="searchTxt"
					type="text"
					placeholder="Search by name"
				/>
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