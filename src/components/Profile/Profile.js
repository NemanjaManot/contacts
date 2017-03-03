import React from "react";
import {connect} from "react-redux";

import {editProfile, changeImage} from "../../actions/userActions";

import ProfileInformation from "./ProfileInformation";

import "./profile.scss";



class Profile extends React.Component {
    render(){
        const user = this.props.loggedUser;
        let body;
        if (user) {
            const profileInformation = (
                <ProfileInformation
                    name={user.name}
                    username={user.username}
                    password={user.password}
                    email={user.email}
                    phone={user.phone}
                    website={user.website}
                    address={user.address}
                    company={user.company}
                    img={user.img}
                    id={user.id}
                    key={user.id}
                    profileEdit={this.props.profileEdit}
                    changeImg={this.props.changeImg}
                />
            );
            body = (
                <div>
                    <p>
                        Hello {user.username}! This is your profile page, where you can change and update your profile
                        information.
                    </p>
                    <div className="profileInformation">
                        {profileInformation}
                    </div>
                </div>
            );
        }
        return (
            <div className="col-lg-8 col-lg-offset-2 profilePage">
                <h3>Profile page</h3>
                { body }
            </div>
        );
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
        profileEdit: (edit) => {
            editProfile(dispatch, edit);
        },
        changeImg: (img) => {
            changeImage(dispatch, img);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
