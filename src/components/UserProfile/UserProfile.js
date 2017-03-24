import React from "react";

import SelectedUserProfile from "./SelectedUserProfile";

import {connect} from "react-redux";

import './userProfile.scss'

class Profile extends React.Component {
    render(){
        let selectedUserId = this.props.router.params.userProfileId;
        let selectedUser = this.props.users.filter(user => {
            return user.id == selectedUserId
        });
        let renderSelectedUserProfile = selectedUser.map(selectedUser => {
            return (
                <SelectedUserProfile
                    key={selectedUser.id}
                    id={selectedUser.id}
                    name={selectedUser.name}
                    username={selectedUser.username}
                    role={selectedUser.role}
                    contacts={selectedUser.contacts}
                    img={selectedUser.img}
                    registerDate={selectedUser.registerDate}
                />
            )
        });

        return (
            <div className="userProfile col-lg-8 col-lg-offset-2">
                <h3>User profile page</h3>
                {renderSelectedUserProfile}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
