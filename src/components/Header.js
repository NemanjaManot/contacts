import React from "react";
import {Link} from "react-router"

export const Header = (props) => {

    const moreOrange = '#e67e22';
    const likeWhite = '#ecf0f1';

    return (
        <div>
            <div className="nav">
                <ul>
                    <li>
                        <Link to={"/home"} activeStyle={{ backgroundColor: moreOrange, color: likeWhite }}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to={"/test"} activeStyle={{ backgroundColor: moreOrange, color: likeWhite }}>
                            Test 2
                        </Link>
                    </li>

                    <li>
                        <a href="#">Something</a>
                    </li>

                    <li>
                        <a href="#">Something</a>
                    </li>

                    <li>
                        <Link to={"/about"} activeStyle={{ backgroundColor: moreOrange, color: likeWhite }}>
                            About
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
};