import React from "react";
import {connect} from "react-redux";

import UserList from "./UserList";

import {fetchUsers} from "../actions/userActions";


class App extends React.Component {

	componentWillMount(){
		this.props.dispatch(fetchUsers());
	}

	render(){
		return (
			<div className="container-fluid">
				<UserList users = {this.props.users} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    };
};

export default connect(mapStateToProps)(App)