import React from "react";
import {connect} from "react-redux";

import Conversation from "./conversation";

import {fetchMessage, sendMsg} from "../../actions/conversationAction";

import './inboxStyle.scss'

class Inbox extends React.Component {

    constructor(){
        super();
        this.state = {
            modal: false,
            message: '',
            selectedUserId: 0
        }
    }

    componentDidMount() {
        this.props.getMessage();
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
                text: message
            };
            this.props.sendMessage(msgInExistingConversation);
        } else {
            let newMsg = {
                text: message,
                id: loggedId,
                members: [loggedId, selectUserId]
            };
            this.props.sendMessage(newMsg);
        }

        this.setState({
            modal: false
        });

        this.refs.textArea.value = '';
    }


    getChatOnClick(){
        console.log('pass');
    }


    renderModal(){
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;
        const selectUserId = this.state.selectedUserId;

        let disabledBtn = selectUserId > 0 ? '' : 'disabled';

        let userOptions = this.props.users.map(user => {
            if(user.id !== loggedId) {
                return <option value={user.id} key={user.id} id={user.id}>{user.username}</option>
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

                            <select className="form-control" value={selectUserId} onChange={this.onChangeHandler.bind(this, 'selectedUserId')}>
                                <option hidden> -- select an option -- </option>
                                {userOptions}
                            </select>

                            <textarea ref="textArea" onChange={this.onChangeHandler.bind(this, 'message')} className="form-control" rows="5">{}</textarea>

                            <button onClick={this.sendNewMessage.bind(this)} className="btn btn-success" type="submit" disabled={disabledBtn}>Send</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderContactList() {
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
            return (
                <div className="conversationsUsersImg col-lg-6" key={conversationUser.id}>
                    <img className="img img-responsive" src={conversationUser.img} alt=""/>
                    <h6>{conversationUser.username}</h6>

                    <div onClick={this.getChatOnClick.bind(this)} className="chatOnHover"><h5>CHAT</h5></div>
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
        let userConversations = [];
        this.props.conversation.forEach((conversation) => {
            if (conversation.members.find(member => member == loggedId)) {
                userConversations.push(
                    <Conversation
                        conversation={conversation}
                        key={conversation.id}
                    />
                );
            }
        });

        return (
            <section className="inbox col-lg-8 col-lg-offset-2">
                {this.renderModal()}
                <h3>Inbox</h3>
                <p>
                    Hello! Here you will find all your conversation.
                </p>

                <a onClick={this.messageModal.bind(this)} className="sendNewMsgBtn">Send new message</a>

                <div className="clearfix"></div>

                <section className="contactsAndChat">
                    <div className="col-lg-4 contactsImagesList">
                        <h4>Your conversations:</h4>
                        {this.renderContactList()}
                    </div>

                    <div className="col-lg-8">
                        {userConversations}
                    </div>
                </section>

            </section>
        )
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
        getMessage: () => {
            fetchMessage(dispatch)
        },
        sendMessage: (newUsers) => {
            sendMsg(dispatch, newUsers);
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Inbox);