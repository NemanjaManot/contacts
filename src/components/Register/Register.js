import React from "react";
import {connect} from "react-redux";

import {addUser} from "../../actions/userActions";


class Register extends React.Component {

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
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

        let validate = newUser.name == undefined || newUser.email == undefined || newUser.password == undefined || newUser.username == undefined;
        if(validate){
            document.getElementById('wrongRegister').style.display = 'block';
        } else if (newUser.username == 'Neman'){
            console.log('SAME NAME')
        } else {
            this.props.newUsers(newUser);
            document.getElementById('hideAfterRegister').style.display = 'none';
            document.getElementById('showAfterRegisterId').style.display = 'block';
        }

        document.getElementById('myForm').reset();
    }



    generateId(){
        let newId = this.props.users[this.props.users.length-1].id;
        return newId+1;
    }

    render() {
        return (
            <section>
                <div className="col-lg-8 col-lg-offset-2">
                    {/* ADD NEW USER */}
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

                        <p id="wrongRegister">You must fill in all of the Fields</p>

                        <a onClick={this.registerNewUser.bind(this)} type="submit" className="btn btn-lg btn-block btnLogin">
                            Add
                        </a>

                        <p className="goToReg-LogPage" id="hideAfterRegister" >
                            Already have account? <a href="#/login">Log in</a>
                        </p>

                        <p className="showAfterRegister" id="showAfterRegisterId">
                            You are now registered - go to <a href="#/login">login page</a>
                        </p>

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
        newUsers: (newUser) => {
            dispatch(addUser(newUser));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);