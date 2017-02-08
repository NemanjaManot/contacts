import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import Root from "./components/Root.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";

import Login from "./components/Login/Login.js";

import store from "./store";

import "./css/style.scss";

// test
function testAuth(nextState, replace) {
    if (true) {
        replace('/login')
    }
}

ReactDOM.render(
    <Provider store={store}>

        <Router history={hashHistory}>
            <Route component={Root}>
                <Route path={"/"} component={Home} />
                <Route path={"about"} component={About} onEnter={testAuth} />
                <Route path={"login"} component={Login} />
            </Route>
        </Router>

    </Provider>,
    document.getElementById('app')
);
