import React from "react";
import {Link} from "react-router"

import "./navigation.scss";

export class Header extends React.Component {

    logOut(){
        const token = '';
        this.props.logout(token);
    }

    loggedUser() {
        let userUsername = localStorage.getItem('username');
        return userUsername;
    }

    activeStyleCss(){
        let colors = {
            moreOrange: '#e67e22',
            likeWhite: '#ecf0f1'
        };
        return colors;
    }


    renderSolutions(){
        let newMsgs;
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let newMsgCount = this.props.conversation.filter(conversation => {
            let isLastMsg = conversation.messages[conversation.messages.length-1].id == loggedId;

           return conversation.members.find(id => id == loggedId) && conversation.haveNewMessage && !isLastMsg
        });

        if(newMsgCount.length) {
            newMsgs = <span className="notificationMsg">{newMsgCount.length}</span>;
        }

        if(localStorage.getItem('activeUserToken')){
            return (
                <span>
                    <li>
                        <Link to={'/profile'} activeStyle={{ backgroundColor: this.activeStyleCss().moreOrange , color: this.activeStyleCss().likeWhite}}>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link className='inboxNavigation' to={'/inbox'} activeStyle={{ backgroundColor: this.activeStyleCss().moreOrange , color: this.activeStyleCss().likeWhite}}>
                            Inbox {newMsgs}
                        </Link>
                    </li>
                    <li>
                        <Link onClick={this.logOut.bind(this)} to={'/login'}>
                            Logout <span>({this.loggedUser()})</span>
                        </Link>
                    </li>
                </span>
            )
        } else {
            return (
                <li>
                    <Link to={'/login'} activeStyle={{ backgroundColor: this.activeStyleCss().moreOrange , color: this.activeStyleCss().likeWhite }}>
                        Login
                    </Link>
                </li>
            )
        }
    }

    render(){
        return (
            <div>
                <div className="nav">
                    <ul>
                        <li>
                            <Link to={"/"} activeStyle={{ backgroundColor: this.activeStyleCss().moreOrange , color: this.activeStyleCss().likeWhite }}>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to={"/contacts"} activeStyle={{ backgroundColor: this.activeStyleCss().moreOrange , color: this.activeStyleCss().likeWhite }}>
                                My Contacts
                            </Link>
                        </li>

                        {this.renderSolutions()}
                    </ul>
                </div>

                <div className="head">
                    <h1 className="headFirst">Contacts list</h1>
                    <h2 className="headSecond">Redux Training</h2>
                </div>
            </div>
        );
    }
}
