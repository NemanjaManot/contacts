import React from "react";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import {Link} from "react-router"

import {loginUser} from "../../actions/userActions";

import "./loginRegisterForm.scss";


class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            loginStyle: true ,
            loginUsername: '' ,
            loginPassword: '',
            modal: false
        }
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    loginUsers(){
        const username = this.state.loginUsername;
        const password = this.state.loginPassword;

        const userExists = this.props.users.find(user => {
           return user.username == username && user.password == password;
        });
        if(userExists) {
            this.setState({
                modal: true
            });
        } else {
            this.setState({
                loginStyle: false
            })
        }
    }

    /* --- MODAL --- */
    modalAfterLogin(){
        if(this.state.modal){
            return (
                <div className="modalAfterLogin">
                    <div className="childModal">
                        <h2>Welcome</h2>
                        <p>
                            Hello!
                            <br/>
                            If you are administrator on this website
                            then you have permission to change information about all users or delete them.
                            <br/>
                            If you our member you can find all other members and read more about them.
                            At any moment you can visit your profile page and update your personal information.
                        </p>
                        <br/>
                        <a onClick={this.closeModal.bind(this)} className="closeModal">Close</a>
                    </div>
                </div>
            )
        }
    }

    closeModal(){
        const password = this.state.loginPassword;
        const username = this.state.loginUsername;

        this.props.users.forEach(user => {
            if(user.username == username && user.password == password) {
                let logUser = {
                    token: Math.random().toString(36).substr(2),
                    id: user.id,
                    username: username
                };
                this.props.login(logUser);
            }
        });
    }
    /* --- END MODAL --- */

        // zaustavlja vracanje na login stranicu ako je user ulogovan

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeUserToken && nextProps.activeUserToken === localStorage.getItem('activeUserToken')) {
            hashHistory.push('/');
        } else {
            localStorage.removeItem('activeUserToken');
        }
    }



    renderWrongLogin(){
        if(this.state.loginStyle == false) {
            return <p className="wrongLogin">Wrong username or password. Try again!</p>
        }
    }



    render() {
        return (
            <section>
                {this.modalAfterLogin()}

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

                        {this.renderWrongLogin()}

                        <a onClick={this.loginUsers.bind(this)} className="btn btn-lg btn-block btnLogin">Login</a>

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
        activeUserToken: state.usersReducer.activeUserToken,
        loggedUser: state.usersReducer.loggedUser
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