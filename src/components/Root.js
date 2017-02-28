import React from "react";
import {connect} from "react-redux";

import {fetchUsers, logoutUser} from "../actions/userActions";

import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";

import "../css/style.scss";

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
                        loggedUser={this.props.loggedUser}
                        users={this.props.users}
                    />
                </div>
                <div className="row mainDiv">
                    {this.props.children}
                </div>
                <div className="row">
                    <Footer
                        users={this.props.users}
                        loggedUser={this.props.loggedUser}
                    />
                </div>
			</div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        loggedUser: state.usersReducer.loggedUser
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