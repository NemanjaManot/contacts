import React from "react";
import {connect} from "react-redux";

import {fetchUsers} from "../actions/userActions";

import {Header} from "./Header";

class App extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render(){
        return (
			<div className="container-fluid">
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
			</div>
        )
    }
}



const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            fetchUsers(dispatch)
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);