import React from "react";
import {connect} from "react-redux";

import {loginUser} from "../../actions/userActions";



class Login extends React.Component {

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    loginUser(){
        let login = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        };
        this.props.login(login);
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
                        <a onClick={this.loginUser.bind(this)} className="btn btn-lg btn-block btnLogin">Login</a>
                    </form>
                </div>
            </section>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (login) => {
            dispatch(loginUser(login));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);