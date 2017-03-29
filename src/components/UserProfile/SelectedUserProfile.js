import React from "react";
import {connect} from "react-redux";

import {Link} from "react-router"

import {editUsers} from "../../actions/userActions";

import moment from 'moment';

class SelectedUserProfile extends React.Component {

    addToContact(userId){
        this.props.loggedUser.contacts.push(userId);
        this.props.updateUser(this.props.loggedUser);
    }

    removeFromContact(userId){
        let removeThisUser = this.props.loggedUser.contacts.indexOf(userId);
        this.props.loggedUser.contacts.splice(removeThisUser, 1);
        this.props.updateUser(this.props.loggedUser);
    }

    // if logged contacts == this.props.id
    renderAddContact(){
        let loggedContacts = this.props.loggedUser && this.props.loggedUser.contacts;
        if(loggedContacts.find(id =>id === this.props.id)){
            return (
                <div className="friendRemove">
                    <div>
                        <p>Remove</p>
                        <i onClick={this.removeFromContact.bind(this, this.props.id)} className="fa fa-times fa-2x rmvButton">{}</i>
                    </div>
                    <div>
                        <p>Friend</p>
                        <i className="fa fa-check-square fa-2x">{}</i>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Add to contacts</p>
                    <i onClick={this.addToContact.bind(this, this.props.id)} className="fa fa-plus-square fa-2x" aria-hidden="true">{}</i>
                </div>
            )
        }
    }

    render(){
        /* --- Last conversatiod date of selcted user (profile) ---*/
        let lastConversation = this.props.conversation.filter(conversation => {
           return conversation.members.find(id => id === this.props.id);
        }).map(conversation => conversation.messages.filter(message => message.id === this.props.id)).map(arr => arr.map(obj => obj.date)).map(arr => Math.max.apply(Math, arr));
        let lastConversationDate = moment(Math.max.apply(Math, lastConversation)).format('DD. MMMM YYYY.');

        /* --- Number of followers of selected user (profile) --- */
        let followers = this.props.users.filter(user => user.contacts.find(id => id === this.props.id)).length;

        return (
            <div className="col-lg-8 col-lg-offset-2 selectedUserProfile">
                <i className="fa fa-circle" aria-hidden="true">{}</i>
                <div className="imgAndName">
                    <img className="img img-responsive" src={this.props.img} alt="UserImg"/>
                    <h4>{this.props.name}</h4> <br/>

                    <Link to={'/inbox/' + this.props.id}>
                        <h6 className="sendMsgBtn">
                            <i className="fa fa-paper-plane" aria-hidden="true">{}</i> Send message
                        </h6>
                    </Link>
                    <br/><br/>

                    <div className="addIcon">
                        {this.renderAddContact()}
                    </div>
                </div>

                <div className="profileInformations">
                    <div className="profileInformationsHalf">
                        <p className="heading">Username</p>
                    </div>

                    <div className="profileInformationsHalf">
                        <p className="infoProps">{this.props.username}</p>
                    </div>
                </div>

                <div className="clearfix">{}</div>

                <div className="profileInformations">
                    <div className="profileInformationsHalf">
                        <p className="heading">Date register</p>
                    </div>

                    <div className="profileInformationsHalf">
                        <p className="infoProps">{moment(this.props.registerDate).format('DD-MMMM-YYYY.')}</p>
                    </div>
                </div>

                <div className="profileInformations">
                    <div className="profileInformationsHalf">
                        <p className="heading">Last Activity</p>
                    </div>

                    <div className="profileInformationsHalf">
                        <p className="infoProps">
                            {lastConversation.length < 1 ? moment(this.props.registerDate).format('DD-MMMM-YYYY.') : lastConversationDate}
                        </p>
                    </div>
                </div>

                <div className="profileInformations">
                    <div className="profileInformationsHalf">
                        <p className="heading">Contacts</p>
                    </div>

                    <div className="profileInformationsHalf">
                        <p className="infoProps">{this.props.contacts.length}</p>
                    </div>
                </div>

                <div className="profileInformations">
                    <div className="profileInformationsHalf">
                        <p className="heading"
                            title={"How many other users have " + this.props.username + " in contacts list"}
                        >
                            Followers <i className="fa fa-caret-down" aria-hidden="true">{}</i>
                        </p>
                    </div>

                    <div className="profileInformationsHalf">
                        <p className="infoProps">{followers}</p>
                    </div>
                </div>

                <div className="profileInformations">
                    <div className="profileInformationsHalf">
                        <p className="heading">Role</p>
                    </div>

                    <div className="profileInformationsHalf">
                        <p className="infoProps">{this.props.role}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.usersReducer.loggedUser,
        conversation: state.conversationReducer.conversation,
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => {
            editUsers(dispatch, user);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfile);