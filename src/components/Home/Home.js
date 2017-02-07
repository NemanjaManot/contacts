import React from "react";
import {connect} from "react-redux";

import HomeUserList from "./HomeUserList";

import {deleteUser, addUser, editUsers, sortUser, pagination} from "../../actions/userActions";

import {firstLetterCapitalize} from '../justFunctions';

class Home extends React.Component {

    constructor(){
    	super();
        this.state = {
        	searchValue: ''
        };
    }

    onChangeHandler(input, event){
		let stateObj = {};
		stateObj[input] = event.target.value;
		this.setState(stateObj);
	}

    generateId(){
		let newId = this.props.users[this.props.users.length-1].id;
		return newId+1;
	}

    addNewUser() {
        let newUser = {
            name: firstLetterCapitalize(this.state.newUserName),
            email: this.state.newUserMail,
			id: this.generateId(),
			phone: 'TEST PHONE',
            address: {city: "TEST CITY"},
			website: 'TEST WEBSITE',
			company: {name: "TEST COMPANY NAME"},
			img: 'https://avatars0.githubusercontent.com/u/18553180?v=3&s=460'
        };
        this.props.newUsers(newUser);

        this.setState({
            inputName: '',
            inputMail: ''
		});
    }

    search(event){
		this.setState({
			searchValue: event.target.value
		})
	}

	sortingUsers(){
        let sortedUsers = this.props.users.sort((a, b) => {
        	return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
        });
        this.props.sorting(sortedUsers);
	}

	onClickNext() {
		if(this.props.totalPages > this.props.pageNumber) {
            let goNextPag = this.props.pageNumber+1;
			return this.props.goPaginationPage(goNextPag);
		}
	}

    onClickPrev() {
        if(this.props.pageNumber > 1) {
            let goPrevPag = this.props.pageNumber-1;
            return this.props.goPaginationPage(goPrevPag);
        }
	}

	lastPage(){
        let goLastPag = this.props.totalPages;
        return this.props.goPaginationPage(goLastPag);
	}

    firstPage(){
		if(this.props.pageNumber!==1){
            this.props.goPaginationPage(1)
		}
    }


    /* --- RENDER --- */

	render(){
    	let searchedUsers = this.props.users.filter((user) => {
			return user.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    	});

        let pageNumber = this.props.pageNumber - 1;
        let usersPerPage = this.props.usersPerPage;
        const startingIndex = pageNumber * usersPerPage;
        const endingIndex = startingIndex + usersPerPage - 1;

        let paginationUsers = searchedUsers.filter((user, index) => {
			return index >= startingIndex && index <= endingIndex
		});

		let userNodes = paginationUsers.map((user) => {
			return (
				<HomeUserList
					name={user.name}
					email={user.email}
					id={user.id}
					key={user.id}
					removeUser={this.props.removeUser}
					editUser={this.props.editUser}
				/>
			)
		});


		/* --- Styling --- */

        const stopNextClick = {
            display: this.props.pageNumber == this.props.totalPages ? 'none' : ''
        };
        const stopPrevClick = {
            display: this.props.pageNumber == 1 ? 'none' : ''
        };

		return (
			<section>
				<div className="col-lg-8 col-lg-offset-2">
                    {/* - SEARCH - */}
					<div className="form-group search">
						<label htmlFor="searchTxt" className="glyphicon glyphicon-search">{}</label>
						<input
							onChange={this.search.bind(this)}
							id="searchTxt"
							type="text"
							placeholder="Search by name"
							value={this.state.searchValue}
						/>
					</div>

					{/* - TABLE - */}
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
						<a className="prevButton next-prev"
						   onClick={this.onClickPrev.bind(this)}
						   style={stopPrevClick}
						>
							<span className="glyphicon glyphicon-chevron-left">{}</span> Prev
						</a>

						<span onClick={this.firstPage.bind(this)} className="lastFirstPage">
							{this.props.pageNumber === 1 ? '' : '1'}
						</span>

						<span className="currentPage">
							{this.props.pageNumber}
						</span>

						<span onClick={this.lastPage.bind(this)} className="lastFirstPage">
							{this.props.totalPages == this.props.pageNumber ? '' : this.props.totalPages}
						</span>

						<a className="nextButton next-prev"
						   onClick={this.onClickNext.bind(this)}
						   style={stopNextClick}
						>
							Next <span className="glyphicon glyphicon-chevron-right">{}</span>
						</a>
					</div>

					<div className="clearfix"></div>
				</div>

				{/* ADD NEW USER */}
				<div className="col-lg-8 col-lg-offset-2">
					<h3>Add new user</h3>
						<div className="form-horizontal" id="myform" name="myform">
							<div className="form-group">
								<label htmlFor="inputName" className="col-sm-3 control-label">First & Last name</label>
								<div className="col-sm-5">
									<input
										onChange={this.onChangeHandler.bind(this, 'newUserName')}
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
										onChange={this.onChangeHandler.bind(this, 'newUserMail')}
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
        users: state.usersReducer.users,
        pageNumber: state.usersReducer.pageNumber,
        totalPages: state.usersReducer.totalPages,
        usersPerPage: state.usersReducer.usersPerPage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: (id) => {
            dispatch(deleteUser(id));
        },
		newUsers: (newUser) => {
            dispatch(addUser(newUser));
		},
        editUser: (edit) => {
        	dispatch(editUsers(edit));
		},
        sorting: (sort) => {
            dispatch(sortUser(sort));
        },
        goPaginationPage: (next) => {
            dispatch(pagination(next));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);