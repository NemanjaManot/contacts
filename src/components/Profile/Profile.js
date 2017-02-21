import React from "react";
import {connect} from "react-redux";

import {editProfile, changeImage} from "../../actions/userActions";

import ProfileInformation from "./ProfileInformation";



class Profile extends React.Component {

    render(){
        let profileInformation = this.props.loggedUser.map((user) => {
            return (
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
            )
        });
        return (
            <div className="col-lg-8 col-lg-offset-2 profilePage">
                <h3>Profile page</h3>
                <p>Hello {this.props.loggedUser.map(user => {return user.username})}! This is your profile page, where you can change and update your profile information.</p>

                <div className="profileInformation">{profileInformation}</div>

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
        profileEdit: (edit) => {
            dispatch(editProfile(edit));
        },
        changeImg: (img) => {
            dispatch(changeImage(img));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
