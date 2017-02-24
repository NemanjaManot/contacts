import React from "react";
import {connect} from "react-redux";

import HomeUserList from "./HomeUserList";

import {deleteUser, editUsers, sortUser, pagination} from "../../actions/userActions";

import "./tableHome.scss";

class Home extends React.Component {

    constructor(){
    	super();
        this.state = {
        	searchValue: ''
        };
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
					<table className="table tableHome">
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
				</div>
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