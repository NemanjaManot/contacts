import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import {removeFromContacts} from "../../actions/userActions";

class ContactsUserList extends React.Component {

    removeFromContacts(id){
        let removeThisUser = this.props.loggedUser.contacts.indexOf(id);
        this.props.loggedUser.contacts.splice(removeThisUser, 1);

        this.props.removeUserFromContacts(this.props.loggedUser);
    }



    showOnlyContacts(){
        let matchIds = this.props.loggedUser.contacts.find(user => {
            return user == this.props.id
        });

        if(matchIds){
            return (
                <div className="aboutUsers col-lg-4 col-md-6 col-xs-12">

                    <div className="contact">

                        <div className="contactsNotHover">
                            <img className="usersImage img-responsive" src={this.props.img} alt="Image"/>
                            <br/>
                            <h4>{this.props.name}</h4>
                            <h5 className="companyName">{this.props.company.name}</h5>

                            <div className="contactsOnHover">
                                <div className="content">
                                    <p><span className="headSpan">Website: </span> {this.props.website} </p>
                                    <p><span className="headSpan">Phone: </span> {this.props.phone}</p>
                                    <p><span className="headSpan">Address: </span> {this.props.address.city}</p>
                                    <p><span className="headSpan">Username: </span> {this.props.username}</p>
                                    <hr/>
                                    <Link className='sendMsgBtn' to={'/inbox/' + this.props.id}><i className="fa fa-reply">{}</i> Send message</Link>
                                    <a className="removeFromContacts" onClick={this.removeFromContacts.bind(this, this.props.id)}>Remove from contacts</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        } else {
            return <div></div>
        }
    }

    render() {
        return this.showOnlyContacts()
    }

}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeUserFromContacts: (remove) => {
            removeFromContacts(dispatch, remove);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsUserList);