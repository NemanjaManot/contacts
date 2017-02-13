import React from "react";
import {connect} from "react-redux";

import {fetchUsers, logoutUser} from "../actions/userActions";

import {Header} from "./Header";

class App extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render(){
        return (
			<div className="container-fluid">
                <div className="row">
                    <Header
                        logout={this.props.logout}
                    />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
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
        logout: () => {
            dispatch(logoutUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);