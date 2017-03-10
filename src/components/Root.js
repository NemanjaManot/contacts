import React from "react";
import {connect} from "react-redux";

import {fetchUsers, logoutUser} from "../actions/userActions";
import {fetchMessage} from "../actions/conversationAction";

import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";

import "../css/style.scss";

class App extends React.Component {

    componentDidMount() {
        this.props.getUsers();
        this.props.getMessage();
    }

    render(){
        return (
			<div className="container-fluid">
                <div className="row">
                    <Header
                        logout={this.props.logout}
                        loggedUser={this.props.loggedUser}
                        users={this.props.users}
                        conversation={this.props.conversation}
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
        loggedUser: state.usersReducer.loggedUser,
        conversation: state.conversationReducer.conversation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            fetchUsers(dispatch)
        },
        logout: () => {
            dispatch(logoutUser());
        },
        getMessage: () => {
            fetchMessage(dispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);