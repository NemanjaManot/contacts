import React from "react";
import {connect} from "react-redux";

import User from "./User";

import {deleteUser, fetchUsers, addUser, editUsers, sortUser} from "../actions/userActions";

import {firstLetterCapitalize, onChangeHandler} from '../components/justFunctions';

class UserList extends React.Component {

    componentDidMount(){
        this.props.getUsers();
        this.state = {
        	searchValue: ''
        };
    }

    generateId(){
		let newId = this.props.users[this.props.users.length-1].id;
		return newId+1;
	}

    addNewUser() {
        let newUser = {
            name: firstLetterCapitalize(this.state.newUserName),
            email: this.state.newUserMail,
			id: this.generateId()
        };
        this.props.newUsers(newUser);
        event.preventDefault();

        document.getElementById("inputName").value='';
        document.getElementById("inputMail").value=''; // reset input after submit
    }

    search(){
        let searchInput = document.getElementById("searchTxt").value;
		this.setState({
			searchValue: searchInput
		})
	}

	sortingUsers(){
        let getSort = this.props.users.sort((a, b) => {
            return a.name > b.name;
        });
        this.props.sorting(getSort);
	}

	onClickNext(){
    	let currentPage = 1;
    	let userPerPage = 5;
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
					editUser={this.props.editUser}
				/>
			)
		});
		return (
			<section>
				<div className="nav">
					<ul>
						<li><a className="active" href="#">Home</a></li>
						<li><a href="#">Something</a></li>
						<li><a href="#">Something</a></li>
						<li><a href="#">Something</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
				</div>

				<div className="head">
					<h1 className="headFirst">Redux Training</h1>
					<h2 className="headSecond">Contacts list</h2>
				</div>

				<div className="col-lg-8 col-lg-offset-2">
                    {/* - SEARCH - */}
					<div className="form-group search">
						<label htmlFor="searchTxt" className="glyphicon glyphicon-search">{}</label>
						<input
							onChange={this.search.bind(this)}
							id="searchTxt"
							type="text"
							placeholder="Search by name"
						/>
					</div>
					<table className="table">
						<thead>
							<tr>
								<th>
									User <span onClick={this.sortingUsers.bind(this)} className="glyphicon glyphicon-sort sortIcon">{}</span>
								</th>
								<th>
									Email
								</th>
							</tr>
						</thead>
						<tbody>
                        	{userNodes}
						</tbody>
					</table>

					{/* -- PAGINATION -- */}
					<div className="paginationButtons">
						<a className="prevButton next-prev">
							<span className="glyphicon glyphicon-chevron-left">{}</span> Prev
						</a>
						<a className="nextButton next-prev"
						   onClick={this.onClickNext.bind(this)}
						>
							Next <span className="glyphicon glyphicon-chevron-right">{}</span>
						</a>
					</div>

					<br/> <br/> <br/>
					<div className="clearfix"></div>
				</div>
				<div className="col-lg-8 col-lg-offset-2">
					<h3>Add new user</h3>
						<div className="form-horizontal" id="myform" name="myform">
							<div className="form-group">
								<label htmlFor="inputName" className="col-sm-3 control-label">First & Last name</label>
								<div className="col-sm-5">
									<input
										onChange={onChangeHandler.bind(this, 'newUserName')}
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
										onChange={onChangeHandler.bind(this, 'newUserMail')}
										type="text"
										className="form-control"
										id="inputMail"
										placeholder="Email"
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-3 col-sm-5">
									<button onClick={this.addNewUser.bind(this)} type="submit" className="btn button-style">
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
		},
        editUser: (edit) => {
        	dispatch(editUsers(edit));
		},
        sorting: (edit) => {
            dispatch(sortUser(edit));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);