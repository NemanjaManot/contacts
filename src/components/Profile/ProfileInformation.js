import React from "react";

class ProfileInformation extends React.Component {

    constructor(){
        super();
        this.state = {
            changeEmail: '',
            changeName: '',
            newImage: '',
            changePassword: '',
            changeUsername: '',
            changePhone: '',
            changeWebsite: '',
            changeAddressCity: '',
            changeAddressStreet: '',
            changeCompanyName: '',
            editing: false,
            changeImage: false,
            valueInput: 'testttt'
        }
    }

    updateSearch(event){
        this.setState({
            valueInput: event.target.value
        })
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

    editButton(){
        this.setState({
            editing: true
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
            name: this.state.changeName,
            email: this.state.changeEmail,
            username: this.state.changeUsername,
            password: this.state.changePassword,
            phone: this.state.changePhone,
            website: this.state.changeWebsite,
            companyName: this.state.changeCompanyName,
            addressCity: this.state.changeAddressCity,
            addressStreet: this.state.changeAddressStreet,
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
                        onChange={this.onChangeHandler.bind(this, 'newImage')}
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

    renderChangeInformation(){
        if(this.state.editing) {
            return (
                <tbody>
                    <a onClick={this.saveChangedInformation.bind(this)}>Save</a>
                    <tr>
                        <th>First & Last name:</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeName')}
                                placeholder={this.props.name}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>E mail address:</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeEmail')}
                                placeholder={this.props.email}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeUsername')}
                                placeholder={this.props.username}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changePassword')}
                                placeholder={''}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changePhone')}
                                placeholder={this.props.phone}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeWebsite')}
                                placeholder={this.props.website}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Company</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeCompanyName')}
                                placeholder={this.props.companyName}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeAddressCity')}
                                placeholder={this.props.addressCity}
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Street</th>
                        <td>
                            <input
                                onChange={this.onChangeHandler.bind(this, 'changeAddressStreet')}
                                placeholder={this.props.addressStreet}
                                type="text"
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

                    <table className="tableProfile">
                        {this.renderChangeInformation()}
                    </table>
                </section>







                <div className="justForTest"></div>

            </div>
        )
    }

}


export default ProfileInformation;