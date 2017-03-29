import React from "react";

import {editUsers} from "../../actions/userActions";

import {connect} from "react-redux";


class Userlist extends React.Component {

    changeRole(userId){
        let changeRole = {
            role: 'admin',
            id: userId
        };
        this.props.updateUser(changeRole);
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.name} <span className="username">({this.props.username})</span>
                </td>
                <td>
                    {this.props.role}
                </td>
                <td>
                    <a onClick={this.changeRole.bind(this, this.props.id)} className="changeRoleBtn">Change role</a>
                </td>
                <td>
                    <i className="fa fa-times fa-2x deleteUserBtn">{}</i>
                </td>
            </tr>
        )
    }

}


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => {
            editUsers(dispatch, user);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);