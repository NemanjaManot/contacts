import React from "react";
import {connect} from "react-redux";


class InboxList extends React.Component {

    /* Does Logged ID matches in conversation members? */
    showUserLoggedConversation(){
        let loggedId = this.props.loggedUser.id;

        let membersId = this.props.members.find(msg => {
            return msg == loggedId
        });

        if(membersId){
            return (
                <div>
                    <p>
                        Hello! Here you will find all your conversation.
                    </p>
                    <h4>Conversation number {this.props.id}</h4>
                </div>
            )
        } else {
            return <p>You don't have any conversation yet</p>
        }

    }

    render() {
        return this.showUserLoggedConversation()
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxList);