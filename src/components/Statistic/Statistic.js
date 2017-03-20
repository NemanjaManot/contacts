import React from "react";
import {connect} from "react-redux";
import Graph from './Graph';

import './statisticStyle.scss'

class Statistic extends React.Component {

    render() {
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let lengthOfContacts = this.props.loggedUser && this.props.loggedUser.contacts.length;

        let numberOfConversation = this.props.conversation.map(conversation => conversation).length;

        /* --- here (down) -- */


        /* Number of messages in biggest conversation */
        let lengthConversationMsg = this.props.conversation.map(message => {
            return message.messages.length
        });
        let mostConversationMsgLength = Math.max(...lengthConversationMsg);


        /* --- First user in biggest conversation */
        let mostConversationUserId = this.props.conversation.filter(user => {
            return user.messages.length == mostConversationMsgLength
        }).map(member => {
            return member.members.find(id => id !== loggedId)
        });

        let mostConversationUserUsername = this.props.users.filter(user => {
            return mostConversationUserId.find(id => id == user.id)
        }).map(user => user.username);


        /* --- Second user in biggest conversation */
        let mostConversationUserId2 = this.props.conversation.filter(user => {
            return user.messages.length == mostConversationMsgLength
        }).map(member => {
            return member.members.find(id => id !== mostConversationUserId.find(secondId => secondId))
        });
        let mostConversationUserUsername2 = this.props.users.filter(user => {
            return mostConversationUserId2.find(id => id == user.id)
        }).map(user => user.username);


/*
        let userMostConversationName;
        if(mostConversationUserUsername.length > 1) {
            userMostConversationName = mostConversationUserUsername.join(' / ')
        } else {
            userMostConversationName = mostConversationUserUsername
        }
*/

        // number of conversation loggedUser +
        let numberOfUserChat = this.props.conversation.filter(conversation => {
            return conversation.members.find(member => member == loggedId)
        });

        // id of users with who loggedUser chat +
        let idOfUsersChat = numberOfUserChat.map(convers => {
            return convers.members.find(id => id !== loggedId)
        });
        // id of FRIENDS (in contacts list) with who loggedUser chat +
        let numberOfFriendsChat = this.props.loggedUser && this.props.loggedUser.contacts.filter(contact => {
            return idOfUsersChat.find(id => id == contact)
        }).length;

        let idOfFriendsChat = this.props.loggedUser && this.props.loggedUser.contacts.filter(contact => {
            return idOfUsersChat.find(id => id == contact)
        });
        let nameOfFriendsChat = this.props.users.filter(user => {
            return idOfFriendsChat.find(id => id == user.id)
        }).map(user => user.username);


        return (
            <section className="inboxStatistics col-lg-8 col-lg-offset-2">
                <h1 className="headTitle">Statistics</h1>
                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <h3 className="titleOfStatistics">Personal statistic</h3>

                    <br/>

                    <div className="listMyStat">In your contacts list you have  <span className="spanStats">{ lengthOfContacts }</span> friends</div>

                    <div className="listMyStat">
                        You have conversation with <span className="spanStats">{ numberOfUserChat.length }</span> user. <br/>
                    </div>

                    <div className="listMyStat">
                        From your contacts list you chat with <span className="spanStats">{ numberOfFriendsChat }</span> friends -
                        <span className="spanStats"> { nameOfFriendsChat.join(' // ') } </span>
                    </div>

                </div>

                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <h3 className="titleOfStatistics">All users statistics</h3>
                    <Graph />
                </div>

                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <h3 className="titleOfStatistics">Application statistic</h3>
                    <div className="listMyStat">Number of conversation - <span className="spanStats">{numberOfConversation}</span>.</div>

                    <div className="listMyStat">
                        Conversation with the most messages - <span className="spanStats">{ mostConversationMsgLength }</span>.
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        conversation: state.conversationReducer.conversation,
        users: state.usersReducer.users,
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);