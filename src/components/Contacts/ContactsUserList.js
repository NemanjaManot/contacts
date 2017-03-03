import React from "react";
import {connect} from "react-redux";

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
                <div className="aboutUsers col-lg-6 col-xs-12">
                    <div>
                        <h4>{this.props.name}</h4>
                        <h5 className="companyName">{this.props.company.name}</h5>
                        <img className="usersImage img-responsive" src={this.props.img} alt="Image"/>
                    </div>

                    <a className="removeFromContacts" onClick={this.removeFromContacts.bind(this, this.props.id)}>Remove from contacts</a>

                    <a className="sendMsgBtn">Send message <i className="fa fa-reply">{}</i></a>

                    <br/>

                    <p><span className="headSpan">Website: </span> {this.props.website} </p>

                    <p>{this.props.name} have <span className="headSpan">ID of {this.props.id}</span> and he lives in {this.props.address.city}</p>

                    <p><span className="headSpan">Phone: </span> {this.props.phone}</p>

                    <p>
                        <span className="headSpan">About user: </span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Aperiam architecto, aspernatur atque beatae blanditiis consequuntur ea
                        exercitationem iusto maiores obcaecati odio odit officiis,
                        optio perferendis quasi ratione saepe sed veniam!
                    </p>

                    <hr/>
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