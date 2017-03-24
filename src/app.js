import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import Root from "./components/Root.js";
import Home from "./components/Home/Home.js";
import Contacts from "./components/Contacts/Contacts.js";
import Register from "./components/Login-Register/Register.js";
import Profile from "./components/Profile/Profile.js"
import Statistic from "./components/Statistic/Statistic.js"
import Inbox from "./components/Inbox/Inbox.js"
import UserProfile from "./components/UserProfile/UserProfile.js"

import Login from "./components/Login-Register/Login.js";

import store from "./store";


function testAuth(nextState, replace, next) {
    const token = localStorage.getItem('activeUserToken');
    if (!token) {
        replace('/login')
    }
    next();
}

function userProfileCheck(nextState, replace, next){
    const userId = nextState.params.userProfileId;
    const loggedId = localStorage.getItem('activeUserId');
    if(userId === loggedId) {
        replace('/profile');
    }
    next();
}

function tryLogin(nextState, replace, next) {
    const token = localStorage.getItem('activeUserToken');
    if (token) {
        replace('/');
    }
    next();
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route component={Root}>
                <Route path={"/"} component={Home} onEnter={testAuth} />
                <Route path={"contacts"} component={Contacts} onEnter={testAuth} />
                <Route path={"register"} component={Register} onEnter={tryLogin} />
                <Route path={"login"} component={Login} onEnter={tryLogin} />
                <Route path={"profile"} component={Profile} onEnter={testAuth} />
                <Route path={"statistic"} component={Statistic} onEnter={testAuth} />
                <Route path={"inbox"} component={Inbox} onEnter={testAuth}>
                    <Route path={":userId"} />
                    <Route path={"chat/:chatUserId"} />
                </Route>
                <Route path={"userProfile"} component={UserProfile} onEnter={testAuth}>
                    <Route path={":userProfileId"} onEnter={userProfileCheck} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
