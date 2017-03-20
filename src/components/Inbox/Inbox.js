import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import Conversation from "./conversation";

import {sendMsg, viewMsg} from "../../actions/conversationAction";

import './inboxStyle.scss'

class Inbox extends React.Component {

    constructor(){
        super();
        this.state = {
            modal: false,
            message: '',
            selectedUserId: 0,
            chat: false
        };
    }


    componentWillReceiveProps(nextProps){
        const userId = nextProps.router.params.userId;
        // posle klika na 'send msg' na stranici kontakt desava se ovo (router params):
        if (userId) {
            this.setState({
                modal: true,
                selectedUserId: userId
            });
        }

        const chatUserId = nextProps.router.params.chatUserId;
        if (chatUserId){
            this.setState({
                chat: true
            });
        }
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    messageModal(){
        this.setState({
            modal: true
        })
    }
    closeModal(){
        this.setState({
            modal: false
        })
    }

    sendNewMessage(){
        const message = this.state.message;
        const selectUserId = this.state.selectedUserId;
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let conversationId = false;
        this.props.conversation.forEach((convers) => {
            if (convers.members.find(member => member == loggedId) && convers.members.find(member => member == selectUserId)){
                conversationId = convers.id;
            }
        });

        if(conversationId){
            let msgInExistingConversation = {
                conversationId,
                id: loggedId,
                text: message,
                date: Date.now()
            };
            this.props.sendMessage(msgInExistingConversation);
        } else {
            let newMsg = {
                text: message,
                id: loggedId,
                members: [loggedId, Number(selectUserId)],
                date: Date.now()
            };
            this.props.sendMessage(newMsg);
        }

        this.setState({
            modal: false
        });

        this.refs.textArea.value = '';
    }

    viewMessage(conversationId){
        this.props.viewMessage(conversationId);
    }


    renderModal(){
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;
        let loggedContacts = this.props.loggedUser && this.props.loggedUser.contacts;
        const selectUserId = this.state.selectedUserId;

        let disabledBtn = selectUserId > 0 ? '' : 'disabled';

        let userOptionsOther = [];
        let userOptionsContact = [];

        this.props.users.forEach(user => {
            let option = <option value={user.id} key={user.id} id={user.id}>{user.username}</option>;
            if(loggedContacts.find(id => id == user.id)) {
                return userOptionsContact.push(option)
            } else if (loggedId !== user.id) {
                return userOptionsOther.push(option)
            }
        });

        if(this.state.modal){
            return (
                <div className="modalConversation">
                    <div className="childModalConversation">
                        <a onClick={this.closeModal.bind(this)} className="closeModal">X</a>
                        <div className="clearfix"></div>
                        <div className="formSendMsg">

                            <label>Select user</label>

                            <select className="selectpicker form-control" value={selectUserId} onChange={this.onChangeHandler.bind(this, 'selectedUserId')}>
                                <option hidden> -- select an option -- </option>
                                <optgroup label="Contacts">
                                    {userOptionsContact}
                                </optgroup>
                                <optgroup label="Other">
                                    {userOptionsOther}
                                </optgroup>
                            </select>

                            <textarea ref="textArea" onChange={this.onChangeHandler.bind(this, 'message')} className="form-control" rows="5">{}</textarea>

                            <button onClick={this.sendNewMessage.bind(this)} className="btn btn-success" type="submit" disabled={disabledBtn}>Send</button>
                        </div>
                    </div>
                </div>
            )
        }
    }


    renderConversationList() {
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let userConversations = this.props.conversation.filter(conversation => {
            return conversation.members.find(member => {
                return member == loggedId
            })
        });

        let contacts = userConversations.map(conversation => {
            let conversationUser = this.props.users.find(user => {
                return user.id !== loggedId && (conversation.members.find(member => member == user.id))
            });

            let lastId = conversation.messages[conversation.messages.length-1].id == loggedId;

            return (
                <div className="conversationsUsersImg col-lg-4" key={conversationUser.id}>
                    <img className="img img-responsive" src={conversationUser.img} alt=""/>
                    <h6>
                        {lastId || conversation.haveNewMessage == false ? '' : <span className="newMsgFromThisUser">{}</span>}
                        {conversationUser.username}
                    </h6>
                    <Link onClick={this.viewMessage.bind(this, conversation.id)} to={'/inbox/chat/' + conversationUser.id} className="chatOnHover"> <h5>CHAT</h5> </Link>
                </div>
            )
        });

        return (
            <div>
                {contacts}
            </div>
        )
    }



    render() {
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;
        let activeChat = this.props.router.params.chatUserId;
        let userConversation;
        this.props.conversation.forEach((conversation) => {
            if (conversation.members.find(member => member == loggedId) && conversation.members.find(member => member == activeChat) ) {
                userConversation = (
                    <Conversation
                        conversation={conversation}
                        key={conversation.id}
                    />
                );
            }
        });

        let loggedIdInConversations;
        this.props.conversation.forEach(conversation => {
            if (conversation.members.find(member => member === loggedId)){
                loggedIdInConversations = 'Click the conversation to display chat'
            } else {
                loggedIdInConversations = "You don't have any conversation yet."
            }
        });

        return (
            <section className="inbox col-lg-8 col-lg-offset-2">
                {this.renderModal()}
                <a onClick={this.messageModal.bind(this)} className="col-lg-4 sendNewMsgBtn">Send new message</a>

                <div className="clearfix"></div>

                <section className="contactsAndChat">
                    <div className="col-lg-4 contactsImagesList">
                        <h4>Your conversations:</h4>
                        {this.renderConversationList()}
                    </div>

                    <div className="col-lg-8">
                        { this.state.chat == true ? userConversation : loggedIdInConversations }
                    </div>
                </section>
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
        sendMessage: (newUsers) => {
            sendMsg(dispatch, newUsers);
        },
        viewMessage: (newUsers) => {
            viewMsg(dispatch, newUsers);
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Inbox);