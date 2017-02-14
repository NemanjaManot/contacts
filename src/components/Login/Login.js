import React from "react";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import {Link} from "react-router"

import {loginUser} from "../../actions/userActions";



class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            loginStyle: true ,
            loginUsername: '' ,
            loginPassword: ''
        }
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    loginUser(){
        const username = this.state.loginUsername;
        const password = this.state.loginPassword;

        this.props.users.forEach(user => {
           if(user.username == username && user.password == password){
               let logUser = {
                   token: Math.random().toString(36).substr(2),
                   id: user.id,
                   username: username
               };
               this.props.login(logUser);
           } else {
               this.setState({
                   loginStyle: false
               })
           }
        });
    }

        // zaustavlja vracanje na login stranicu ako je user ulogovan

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeUserToken && nextProps.activeUserToken === localStorage.getItem('activeUserToken')) {
            hashHistory.push('/');
        } else {
            localStorage.removeItem('activeUserToken');
        }
    }



    rendersSolutions(){
        if(this.state.loginStyle == false) {
            return <p className="wrongLogin">Wrong username or password. Try again!</p>
        }
    }

    render() {
        return (
            <section>
                <div className="col-lg-8 col-lg-offset-2">
                    <form className="loginForm">
                        <div className="row text-center circleBall"><i className="fa fa-circle">{}</i></div>

                        <img className="img img-responsive img-circle userLoginImg" src="https://goo.gl/mcSmqn" alt="User"/>

                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user">{}</i>
                            </span>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'loginUsername')}
                                type="text"
                                className="form-control"
                                name="Username"
                                placeholder="Username" />
                        </div>

                        <div className="input-group">
                            <span className="input-group-addon" id="sizing-addon1">
                                <i className="fa fa-lock">{}</i>
                            </span>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'loginPassword')}
                                type="password"
                                className="form-control"
                                name="Password"
                                placeholder="Password"
                                required=""/>
                        </div>

                        <div>{this.rendersSolutions()}</div>

                        <a onClick={this.loginUser.bind(this)} className="btn btn-lg btn-block btnLogin">Login</a>

                        <p className="goToReg-LogPage">
                            Don't have an account? <Link to='/register'>Register now!</Link>
                        </p>
                    </form>
                </div>
            </section>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        activeUserToken: state.usersReducer.activeUserToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => {
            dispatch(loginUser(token));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);