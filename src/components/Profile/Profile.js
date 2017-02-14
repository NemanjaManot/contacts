import React from "react";
import {connect} from "react-redux";

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
                    address={user.address}
                    phone={user.phone}
                    website={user.website}
                    company={user.company}
                    img={user.img}
                    id={user.id}
                    key={user.id}
                />
            )
        });
        return (
            <div className="col-lg-8 col-lg-offset-2">
                <h3>Profile page</h3>
                <p>Hello {this.props.loggedUser.map(user => {return user.username})}! This is your profile page, where you can change and update your profile information.</p>

                <div>{profileInformation}</div>

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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
