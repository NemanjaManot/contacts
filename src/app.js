import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, hashHistory} from "react-router";

import Root from "./components/Root.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";

import Test from "./components/Test.js";  // OBRISATI - SAMO TEST

import store from "./store";

import "./css/style.scss";

ReactDOM.render(
    <Provider store={store}>

        <Router history={hashHistory}>
            <Route component={Root}>
                <Route path={"/"} component={Home} />
                <Route path={"about"} component={About} />
                <Route path={"test"} component={Test} />
            </Route>
        </Router>

    </Provider>,
    document.getElementById('app')
);
