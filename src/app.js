import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import Root from "./components/Root.js";
import Home from "./components/Home/Home.js";
import Contacts from "./components/Contacts/Contacts.js";
import Register from "./components/Register/Register.js";
import Profile from "./components/Profile/Profile.js"

import Login from "./components/Login/Login.js";

import store from "./store";

import "./css/style.scss";


function testAuth(nextState, replace, next) {
    const token = localStorage.getItem('activeUserToken');
    if (!token) {
        replace('/login')
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

function test(nextState,replace, next){
    const token = localStorage.getItem('activeUserToken');
    if(token) {
        replace(nextState);
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
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
