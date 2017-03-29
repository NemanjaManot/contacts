import React from "react";
import Userlist from './Userlist'
import {connect} from "react-redux";
import "./adminPanel.scss";


class AdminPanel extends React.Component {
    render() {
        let userlist = this.props.users.map(user => {
            return (
                <Userlist
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    role={user.role}
                />
            )
        });
        return (
            <div className="adminPanel col-lg-8 col-lg-offset-2">
                <h3 className="heading"><i className="fa fa-circle" aria-hidden="true">{}</i> ADMIN PANEL</h3>
                <p>
                    Hello admin! Here you can change role for other user. User may have role of <strong>admin</strong> or <strong>user</strong>.
                    Also, in admin panel you can delete user from application.
                </p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                User
                            </th>
                            <th>
                                Role
                            </th>
                            <th>

                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                     {userlist}
                    </tbody>
                </table>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);