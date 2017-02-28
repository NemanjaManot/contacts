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
    onInputChange(input, event){
        const stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    /* --- // END //  ON CHANGE HANDLER FUNCTIONS --- */

    editButton(){
        const user = this.props.loggedUser;
        this.setState({
            editing: true,
            valueName: user.name,
            valuePassword: user.password,
            valueEmail: user.email,
            valueUsername: user.username,
            valuePhone: user.phone,
            valueWebsite: user.website,
            valueCompanyName: user.company.name,
            valueAddressCity: user.address.city,
            valueAddressStreet: user.address.street
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
    dontChangeImage(){
        this.setState({
            changeImage: false
        })
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

    cancelChangedInformation(){
        this.setState({
            editing: false
        });
    }


    renderChangeImg(){
        if(this.state.changeImage){
            return (
                <div>
                    <input
                        onChange={this.onInputChange.bind(this, 'newImage')}
                        type="text"
                        placeholder="Put image url"
                    /> <br/>
                    <a onClick={this.saveNewImage.bind(this)} className="saveImgButton">Save</a>
                    <a onClick={this.dontChangeImage.bind(this)} className="dontChangeImg">Cancel</a>
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
                <div>
                    <a className="saveInformationButton" onClick={this.saveChangedInformation.bind(this)}>Save</a>
                    <a className="cancelInformationButton" onClick={this.cancelChangedInformation.bind(this)}>Cancel</a>
                </div>
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
                                onChange={this.onInputChange.bind(this, 'valueName')}
                                type="text"
                                value={this.state.valueName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>E mail address:</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valueEmail')}
                                type="text"
                                value={this.state.valueEmail}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valueUsername')}
                                type="text"
                                value={this.state.valueUsername}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valuePassword')}
                                type="password"
                                value={this.state.valuePassword}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valuePhone')}
                                type="text"
                                value={this.state.valuePhone}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valueWebsite')}
                                type="text"
                                value={this.state.valueWebsite}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valueCompanyName')}
                                type="text"
                                value={this.state.valueCompanyName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valueAddressCity')}
                                type="text"
                                value={this.state.valueAddressCity}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Street</th>
                        <td>
                            <input
                                onChange={this.onInputChange.bind(this, 'valueAddressStreet')}
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

                    <table className="tableProfile">
                        {this.renderChangeInformation()}
                    </table>

                    <div className="saveOrCancelEditInfo">{this.renderSaveBtnInformation()}</div>
                </section>
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