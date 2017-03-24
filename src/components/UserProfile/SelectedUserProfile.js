import React from "react";
import {connect} from "react-redux";

import moment from 'moment';

class SelectedUserProfile extends React.Component {
    // if logged contacts == this.props.id
    renderAddContact(){
        let loggedContacts = this.props.loggedUser && this.props.loggedUser.contacts;
        if(loggedContacts.find(id =>id === this.props.id)){
            return (
                <div className="friendRemove">
                    <div>
                        <p>Remove</p>
                        <i className="fa fa-times fa-2x rmvButton">{}</i>
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
                    <i className="fa fa-plus-square fa-2x" aria-hidden="true">{}</i>
                </div>
            )
        }
    }

    render(){
        let lastConversation = this.props.conversation.filter(conversation => {
           return conversation.members.find(id => id === this.props.id);
        }).map(conversation => conversation.messages.map(message => message.date)).map(arr => Math.max.apply(Math, arr));
        let lastConversationDate = lastConversation.length === 1 ? Math.max.apply(Math, lastConversation) : Math.max.apply(Math, lastConversation);

        return (
            <div className="col-lg-8 col-lg-offset-2 selectedUserProfile">
                <i className="fa fa-circle" aria-hidden="true">{}</i>
                <div className="imgAndName">
                    <img className="img img-responsive" src={this.props.img} alt="UserImg"/>
                    <h4>{this.props.name}</h4>

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
                            {lastConversation.length < 1 ? moment(this.props.registerDate).format('DD-MMMM-YYYY.') : moment(lastConversationDate).format('DD-MMM-YYYY.')}
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
        conversation: state.conversationReducer.conversation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfile);