import React from "react";
import {connect} from "react-redux";

import ContactsUserList from "./ContactsUserList";

import './contactsPage.scss'


class Contacts extends React.Component {

    render() {
        let aboutList = this.props.users.map((user) => {
            return (
                <ContactsUserList
                    name={user.name}
                    email={user.email}
                    img={user.img}
                    company={user.company}
                    website={user.website}
                    address={user.address}
                    phone={user.phone}
                    contacts={user.contacts}
                    id={user.id}
                    key={user.id}
                />
            )
        });
        return (
            <section>
                <div className="col-lg-8 col-lg-offset-2">
                    <div>
                        <h3>Contacts list</h3>
                        <h4>More information about your contacts.</h4>
                        <p>
                            On this page you can see information about your friends.
                            At any moment you can remove some user from your list, and of course on Home page you can added them again.
                        </p>
                    </div>
                    {aboutList}
                </div>
            </section>
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


export default connect(mapStateToProps, mapDispatchToProps)(Contacts);