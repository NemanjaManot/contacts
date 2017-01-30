import React from "react";
import {connect} from "react-redux";

import User from "./User";

import {deleteUser, fetchUsers, addUser} from "../actions/userActions";

class UserList extends React.Component {

	constructor(){
		super();
        this.addNewUser = this.addNewUser.bind(this);
	}

    componentDidMount(){
        this.props.getUsers();
        this.state = {
        	searchValue: ''
        };
    }

    capitalizeWord(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    fillInput(input, e){
        let stateObj = {};
        stateObj[input] = e.target.value;
        this.setState(stateObj);
    }

    addNewUser() {
        let newUser = {
            name: this.fillInput(newUserName),
            email: this.fillInput(newUserMail)
        };
        this.props.newUsers.push(newUser);
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
				/>
			)
		});
		return (
			<section>
				<div className="jumbotron">
					<h1 className="display-3">Hello, world!</h1>
					<p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>

						<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
						<p className="lead">
							<a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
						</p>
				</div>
				<div className="col-lg-5">
					<h3>List</h3>
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
				<div className="col-lg-7">
					<h3>Add new user</h3>
					<div className="form-horizontal">
						<div className="form-group">
							<label htmlFor="inputName" className="col-sm-3 control-label">First & Last name</label>
							<div className="col-sm-5">
								<input
									onChange={this.fillInput.bind(this, 'newUserName')}
									type="text"
									className="form-control"
									id="inputName"
									placeholder="Name"
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="inputMail" className="col-sm-3 control-label">E mail address</label>
							<div className="col-sm-5">
								<input
									onChange={this.fillInput.bind(this, 'newUserMail')}
									type="text"
									className="form-control"
									id="inputMail"
									placeholder="Email"
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-offset-3 col-sm-5">
								<button onChange={this.addNewUser} type="submit" className="btn btn-default">
									Add
								</button>
							</div>
						</div>
					</div>


				</div>
				<div className="clearfix"></div>
				<hr/>
			</section>
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
        },
		newUsers: (newUser) => {
            dispatch(addUser(newUser));
		}

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);