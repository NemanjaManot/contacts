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
        if(localStorage.getItem('activeUserToken')){
            return (
                <span>
                    <li>
                        <Link to={'/profile'} activeStyle={{ backgroundColor: this.activeStyleCss().moreOrange , color: this.activeStyleCss().likeWhite}}>
                            Profile
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
                    <h1 className="headFirst">Redux Training</h1>
                    <h2 className="headSecond">Contacts list</h2>
                </div>
            </div>
        );
    }
}
