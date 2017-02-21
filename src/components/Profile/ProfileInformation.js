import React from "react";

import {connect} from "react-redux";


class ProfileInformation extends React.Component {

    constructor(){
        super();
        this.state = {
            newImage: '',
            editing: false,
            changeImage: false,
            valueName: '',
            valuePassword: '',
            valueEmail: '',
            valueUsername: '',
            valuePhone: '',
            valueWebsite: '',
            valueCompanyName: '',
            valueAddressCity: '',
            valueAddressStreet: ''
        }
    }

    /* --- ON CHANGE HANDLER FUNCTIONS --- */
    onChangeImage(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    onChangeName(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueName: event.target.value
        });
    }

    onChangeEmail(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueEmail: event.target.value
        });
    }

    onChangeUsername(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueUsername: event.target.value
        });
    }

    onChangePassword(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    onChangePhone(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valuePhone: event.target.value
        });
    }

    onChangeWebsite(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueWebsite: event.target.value
        });
    }

    onChangeCompanyName(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueCompanyName: event.target.value
        });
    }

    onChangeAddressCity(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueAddressCity: event.target.value
        });
    }

    onChangeAddressStreet(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);

        this.setState({
            valueAddressStreet: event.target.value
        });
    }


    /* --- // END //  ON CHANGE HANDLER FUNCTIONS --- */

    editButton(){
        let name = this.props.loggedUser.map((user) => {
            return user.name
        });
        let email = this.props.loggedUser.map((user) => {
            return user.email
        });
        let username = this.props.loggedUser.map((user) => {
            return user.username
        });
        let phone = this.props.loggedUser.map((user) => {
            return user.phone
        });
        let website = this.props.loggedUser.map((user) => {
            return user.website
        });
        let companyName = this.props.loggedUser.map((user) => {
            return user.company.name
        });
        let addressCity = this.props.loggedUser.map((user) => {
            return user.address.city
        });
        let addressStreet = this.props.loggedUser.map((user) => {
            return user.address.street
        });


        this.setState({
            editing: true,
            valueName: name,
            valueEmail: email,
            valueUsername: username,
            valuePhone: phone,
            valueWebsite: website,
            valueCompanyName: companyName,
            valueAddressCity: addressCity,
            valueAddressStreet: addressStreet
        });
    }

    changeImageButton(){
        this.setState({
            changeImage: true
        });
    }

    saveNewImage(){
        let changeImg = {
            img: this.state.newImage,
            id: this.props.id
        };
        this.props.changeImg(changeImg);

        this.setState({
            changeImage: false
        });
    }

    saveChangedInformation(){
        let savedUser = {
            name: this.state.valueName,
            email: this.state.valueEmail,
            username: this.state.valueUsername,
            password: this.state.valuePassword,
            phone: this.state.valuePhone,
            website: this.state.valueWebsite,
            companyName: this.state.valueCompanyName,
            addressCity: this.state.valueAddressCity,
            addressStreet: this.state.valueAddressStreet,
            id: this.props.id
        };
        this.props.profileEdit(savedUser);

        this.setState({
            editing: false
        });
    }


    renderChangeImg(){
        if(this.state.changeImage){
            return (
                <div>
                    <input
                        onChange={this.onChangeImage.bind(this, 'newImage')}
                        type="text"
                        placeholder="Put image url"
                    />
                    <a onClick={this.saveNewImage.bind(this)} className="saveProfileButton">Save</a>
                </div>

            )
        } else {
            return (
                <a onClick={this.changeImageButton.bind(this)}>Change image</a>
            )
        }
    }

    renderSaveBtnInformation(){
        if(this.state.editing){
            return (
                <a onClick={this.saveChangedInformation.bind(this)}>Save</a>
            )
        }
    }

    renderChangeInformation(){
        if(this.state.editing) {
            return (
                <tbody>
                    <tr>
                        <th>First & Last name:</th>
                        <td>
                            <input
                                onChange={this.onChangeName.bind(this, 'valueName')}
                                placeholder={this.props.name}
                                type="text"
                                value={this.state.valueName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>E mail address:</th>
                        <td>
                            <input
                                onChange={this.onChangeEmail.bind(this, 'valueEmail')}
                                placeholder={this.props.email}
                                type="text"
                                value={this.state.valueEmail}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>
                            <input
                                onChange={this.onChangeUsername.bind(this, 'valueUsername')}
                                placeholder={this.props.username}
                                type="text"
                                value={this.state.valueUsername}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>
                            <input
                                onChange={this.onChangePassword.bind(this, 'valuePassword')}
                                placeholder={''}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>
                            <input
                                onChange={this.onChangePhone.bind(this, 'valuePhone')}
                                placeholder={this.props.phone}
                                type="text"
                                value={this.state.valuePhone}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>
                            <input
                                onChange={this.onChangeWebsite.bind(this, 'valueWebsite')}
                                placeholder={this.props.website}
                                type="text"
                                value={this.state.valueWebsite}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>
                            <input
                                onChange={this.onChangeCompanyName.bind(this, 'valueCompanyName')}
                                placeholder={this.props.companyName}
                                type="text"
                                value={this.state.valueCompanyName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>
                            <input
                                onChange={this.onChangeAddressCity.bind(this, 'valueAddressCity')}
                                placeholder={this.props.addressCity}
                                type="text"
                                value={this.state.valueAddressCity}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Street</th>
                        <td>
                            <input
                                onChange={this.onChangeAddressStreet.bind(this, 'valueAddressStreet')}
                                placeholder={this.props.addressStreet}
                                type="text"
                                value={this.state.valueAddressStreet}
                            />
                        </td>
                    </tr>
                </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <th>First & Last name:</th>
                        <td>{this.props.name}</td>
                    </tr>
                    <tr>
                        <th>E mail address:</th>
                        <td>{this.props.email}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{this.props.username}</td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>* * *</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{this.props.phone}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>{this.props.website}</td>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>{this.props.companyName}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{this.props.addressCity}</td>
                    </tr>
                    <tr>
                        <th>Street</th>
                        <td>{this.props.addressStreet}</td>
                    </tr>
                </tbody>
            )
        }
    }

    render() {
        return (
            <div className="col-lg-12">
                <section className="sectionTable">

                    <div className="imageDiv">
                        <img className="img-responsive profileImg" src={this.props.img} alt="User Image"/>
                        <div>{this.renderChangeImg()}</div>
                    </div>

                    <div className="informationDiv">
                        <h2>{this.props.name}</h2>
                        <p>
                            Click <a onClick={this.editButton.bind(this)} className="editInformationBtn">here</a> and change your profile information.
                        </p>
                    </div>

                    <div className="clearfix"></div>

                    <div>{this.renderSaveBtnInformation()}</div>

                    <table className="tableProfile">
                        {this.renderChangeInformation()}
                    </table>
                </section>







                {/*<div className="justForTest"></div>*/}

            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInformation);