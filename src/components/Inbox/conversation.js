import React from "react";
import {connect} from "react-redux";

import {sendMsg} from "../../actions/conversationAction";


class Conversation extends React.Component {

    constructor(){
        super();
        this.state = {
            textareaField: ''
        }
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    sendMessage(){
        let fromTextarea = this.state.textareaField;
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let send = {
            conversationId: this.props.conversation.id,
            id: loggedId,
            text: fromTextarea
        };

        this.refs.textArea.value = '';

        this.props.sendMessage(send);
    }

    /* Does Logged ID matches in conversation members? */
    showUserLoggedConversation(){
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;
        let membersId = false;
        this.props.conversation.members.forEach(msg => {
            if (msg == loggedId) {
                membersId = true;
            }
        });

        if(membersId){
            return this.conversationWithWho()
        } else {
            return <p>You don't have any conversation yet</p>
        }

    }
    
    /*
     Koji user komunicira sa logovanim userom
     Naci koji ID iz users niza se poklapa sa ID iz konverzacije - members niz
     */
    conversationWithWho(){
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let memberId = this.props.conversation.members.find(id => {
           return id !== loggedId
        });

        let memberUsername = this.props.users.filter(user => {
            return user.id == memberId
        }).map(user => user.username);

        let memberUsernameStyle = <span className="memberUsername">{memberUsername}</span>;

        let memberImg = this.props.users.filter(user => {
            return user.id == memberId
        }).map(user => user.img);

        const conversations = this.props.conversation.messages.map((msg, index) => {
            return (
                <li key={index}>
                    <span className="userWhichSendMsg">{msg.id == loggedId ? 'You' : memberUsernameStyle}</span>
                    : {msg.text}
                </li>
            );
        });

        if(conversations.length){
            return (
                <div className="conversation">
                    <img className="img img-responsive img-circle imgConversation" src={memberImg} alt="Slika"/>
                    <span className="userFullname">{memberUsername}</span>

                    <ul>
                        {conversations}
                    </ul>

                    <textarea ref="textArea" onChange={this.onChangeHandler.bind(this, 'textareaField')} className="form-control" rows="3">{}</textarea>
                    <br/>
                    <button onClick={this.sendMessage.bind(this)} className="btn btn-success" type="submit">Send</button>
                </div>
            )
        } else {
            return <h3>{}</h3>
        }
    }

    render() {
        return (
            <div>
                {this.showUserLoggedConversation()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.usersReducer.loggedUser,
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newUsers) => {
            sendMsg(dispatch, newUsers);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

