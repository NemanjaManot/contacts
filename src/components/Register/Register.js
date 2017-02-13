import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router"

import {addUser} from "../../actions/userActions";


class Register extends React.Component {

    constructor(){
        super();
        this.state = {
            newUser: '' ,
            newUserMail: '' ,
            newUsername: '' ,
            newPassword: '' ,
            style: 1 ,
            registerPass: false
        }
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    generateId(){
        let newId = this.props.users[this.props.users.length-1].id;
        return newId+1;
    }

    registerNewUser() {
        let newUser = {
            name: this.state.newUser,
            email: this.state.newUserMail,
            id: this.generateId(),
            username: this.state.newUsername,
            password: this.state.newPassword,
            phone: 'TEST PHONE',
            address: {city: "TEST CITY"},
            website: 'TEST WEBSITE',
            company: {name: "TEST COMPANY NAME"},
            img: 'https://avatars0.githubusercontent.com/u/18553180?v=3&s=460'
        };

        let existingUser = this.props.users.find(user => {
            if(user.username == this.state.newUsername) {
                return true
            }
        });

        let validate = newUser.name == '' || newUser.email == '' || newUser.password == '' || newUser.username == '';
        if(validate){
            this.setState({
                style: 2
            })
        } else if (existingUser){
            this.setState({
                style: 3
            })
        } else {
            this.props.newUsers(newUser);
            this.setState({
                registerPass: true
            })
        }

    }

    renderRegisterPass(){
        return (
            <section>
                <div className="col-lg-8 col-lg-offset-2">
                    <form className="loginForm" id="myForm">
                        <div className="row text-center circleBall"><i className="fa fa-circle">{}</i></div>
                        <h2 className="registerCaption">Register</h2>
                        <p className="showAfterRegister">
                            You are now registered - go to <Link to='/login'>login page</Link>
                        </p>
                    </form>
                </div>
            </section>
        )
    }

    renderSolutions(){
        if(this.state.style == 2) {
            return <p className="wrongRegister">You must fill in all of the Fields</p>
        } else if (this.state.style == 3) {
            return (
                <p className="sameName">
                    This username is busy - try again!
                </p>
            )
        }
    }
    render() {
        if(this.state.registerPass){
            return this.renderRegisterPass();
        } else {
            return (
                <section>
                    <div className="col-lg-8 col-lg-offset-2">
                        <form className="loginForm" id="myForm">
                            <div className="row text-center circleBall"><i className="fa fa-circle">{}</i></div>

                            <h2 className="registerCaption">Register</h2>

                            <div className="input-group">
                                <label htmlFor="inputName">First & Last name</label> <span className="spanStar"> * </span>
                                <input
                                    onChange={this.onChangeHandler.bind(this, 'newUser')}
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Name"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="inputMail">E-mail</label> <span className="spanStar"> * </span>
                                <input
                                    onChange={this.onChangeHandler.bind(this, 'newUserMail')}
                                    type="text"
                                    className="form-control"
                                    id="inputMail"
                                    placeholder="E-mail"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="inputUsername">Username</label> <span className="spanStar"> * </span>
                                <input
                                    onChange={this.onChangeHandler.bind(this, 'newUsername')}
                                    type="text"
                                    className="form-control"
                                    id="inputUsername"
                                    placeholder="Username"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="inputPassword">Password</label> <span className="spanStar"> * </span>
                                <input
                                    onChange={this.onChangeHandler.bind(this, 'newPassword')}
                                    type="text"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                />
                            </div>

                            <div>{this.renderSolutions()}</div>

                            <a onClick={this.registerNewUser.bind(this)} type="submit" className="btn btn-lg btn-block btnLogin">
                                Add
                            </a>

                            <p className="goToReg-LogPage">
                                Already have account? <Link to='/login'>Log in</Link>
                            </p>

                        </form>
                    </div>
                </section>
            )
        }

    }

}

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newUsers: (newUser) => {
            dispatch(addUser(newUser));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);