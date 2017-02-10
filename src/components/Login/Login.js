import React from "react";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import {loginUser} from "../../actions/userActions";



class Login extends React.Component {

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
               const token = Math.random().toString(36).substr(2);
               this.props.login(token);
           } else {
               document.getElementById('wrongLogin').style.display = 'block';
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
                        <p id="wrongLogin">Wrong username or password. Try again!</p>

                        <a onClick={this.loginUser.bind(this)} className="btn btn-lg btn-block btnLogin">Login</a>

                        <p className="goToReg-LogPage">
                            Don't have an account? <a href="#/register">Register now!</a>
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