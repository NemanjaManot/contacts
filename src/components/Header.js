import React from "react";
import {Link} from "react-router"

export class Header extends React.Component {

    logOut(){
        const token = '';
        this.props.logout(token);
    }


    render(){

        const moreOrange = '#e67e22';
        const likeWhite = '#ecf0f1';

        return (
            <div>
                <div className="nav">
                    <ul>
                        <li>
                            <Link to={"/"} activeStyle={{ backgroundColor: moreOrange, color: likeWhite }}>
                                Home
                            </Link>
                        </li>

                        <li>
                            <a>Something</a>
                        </li>

                        <li>
                            <a>Something</a>
                        </li>

                        <li>
                            <Link to={"/about"} activeStyle={{ backgroundColor: moreOrange, color: likeWhite }}>
                                About
                            </Link>
                        </li>

                        <li className="logOutButton">
                            <Link
                                onClick={this.logOut.bind(this)}
                                to={'/login'}
                                >
                                Logout
                            </Link>
                        </li>
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
