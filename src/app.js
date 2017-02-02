import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, hashHistory, browserHistory, IndexRedirect} from "react-router";

import Root from "./components/Root.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";

import Test from "./components/Test.js";  // OBRISATI - SAMO TEST

import {syncHistoryWithStore} from 'react-router-redux'

import store from "./store";

import "./css/style.scss";

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>

        <Router history={history}>
            <Route path="/" component={Root}>
                <IndexRoute component={Home} />
                <Route path={"home"} component={Home} />
                <Route path={"about"} component={About} />
                <Route path={"test"} component={Test} />
            </Route>
        </Router>

    </Provider>,
    document.getElementById('app')
);