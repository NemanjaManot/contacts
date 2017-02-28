import React from "react";
import {connect} from "react-redux";

import {editProfile, changeImage} from "../../actions/userActions";

import ProfileInformation from "./ProfileInformation";

import "./profile.scss";



class Profile extends React.Component {

    renderUserContacts(){
        let contactsName = this.props.contactsList.map(user => {
            return user.username + ", "
        });
        let contactsImg = this.props.contactsList.map(user => {
            return user.img;
        });
        let lengthOfContacts = this.props.contactsList.length;

        if(lengthOfContacts > 0){
            return (
                <div>
                    <p>You have {lengthOfContacts} users in your contacts list:</p>
                    <p>{contactsName}</p>

                    {/*<div>*/}
                        {/*<img src={contactsImg} alt="UserImg" />*/}
                    {/*</div>*/}
                </div>
            )
        } else {
            return <p>You don't have a contacts yet. Add some user to your contacts list.</p>
        }

    }

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
                    addressCity={user.address.city}
                    addressStreet={user.address.street}
                    companyName={user.company.name}
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

                        <h4 className="yourContactsHead">Your contacts</h4>
                        { this.renderUserContacts() }
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
        loggedUser: state.usersReducer.loggedUser,
        contactsList: state.usersReducer.contactsList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        profileEdit: (edit) => {
            dispatch(editProfile(edit));
        },
        changeImg: (img) => {
            dispatch(changeImage(img));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
