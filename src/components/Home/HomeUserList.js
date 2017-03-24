import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router"

import {editUsers} from "../../actions/userActions";



class User extends React.Component {

	constructor(){
		super();
		this.state = {
			editing: false
		}
	}

    componentDidMount() {
        this.setState({
            newName: this.props.name,
            newEmail: this.props.email
        });
    }

    onChangeHandler(input, event){
        let stateObj = {};
        stateObj[input] = event.target.value;
        this.setState(stateObj);
    }

	editUser(){
		this.setState({
			editing: true
		})
	}

	firstLetterCapitalize(str) {
	 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
	 }

	saveEditedUser(){
		let savedUser = {
			name: this.firstLetterCapitalize(this.state.newName),
			email: this.state.newEmail,
			id: this.props.id
		};
        this.props.editUser(savedUser);

        this.setState({
            editing: false
        })
	}

	addNewContactClick(id){
        this.props.loggedUser.contacts.push(id);
        this.props.updateUser(this.props.loggedUser);
	}

	/* -- // -- RENDER -- // -- */

    renderAdminRole(){
        const userRole = this.props.loggedUser.role;

        if(userRole == 'admin'){
            return (
				<span>
					<a className="removeButton"
					   onClick={this.props.removeUser.bind(this, this.props.id)}
					>X</a>
					<a className="editButton"
					   onClick={this.editUser.bind(this)}
					>edit</a>
				</span>
            )
        } else {
			return this.editUserYourself();
		}
    }

    renderRemoveRole(){
        const userRole = this.props.loggedUser.role;
        if(userRole == 'admin'){
            return (
				<a className="removeButton" onClick={this.props.removeUser.bind(this, this.props.id)}>X</a>
            )
        }
    }

    editUserYourself(){
        let loggedId = this.props.loggedUser.id;
        if(loggedId == this.props.id){
            return (
				<span>
					<Link to={'/profile'} className='goToProfile'>
						profile
					</Link>
					<a className="editButton" onClick={this.editUser.bind(this)}>edit</a>
				</span>
            )
        }
    }

	renderButton(){
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;
        let loggedContacts = this.props.loggedUser && this.props.loggedUser.contacts;

        let loggedContactsId = loggedContacts.find(user => {
        	return user == this.props.id
        });

        if (loggedId !== this.props.id && loggedContactsId !== this.props.id) {
            return (
				<i title="Add to your contacts list."
					className="fa fa-plus-square fa-2x btnAddContact"
					onClick={this.addNewContactClick.bind(this, this.props.id)}
				>{}</i>
            );
        } else if (this.props.id === loggedId) {
        	return
		} else {
            return <i title="Added to the your contacts list" className="fa fa-check-square fa-2x">{}</i>
        }
	}

    renderNormal(){
		return (
			<tr>
				<td>
					<Link to={'/userProfile/' + this.props.id}>{this.props.name}</Link>
					{this.renderButton()}
				</td>
				<td>
					{this.props.email}
                    {this.renderAdminRole()}
				</td>
			</tr>
		)
	}

    renderOnEditing(){
        return (
			<tr>
				<td>
					<input
						className="input-sm inputEditing"
						type="text"
						defaultValue={this.props.name}
						onChange={this.onChangeHandler.bind(this, 'newName')}
					/>
				</td>
				<td>
					<input
						className="input-sm inputEditing"
						type="text"
						defaultValue={this.props.email}
						onChange={this.onChangeHandler.bind(this, 'newEmail')}
					/>
					{this.renderRemoveRole()}
					<a className="saveButton"
					   onClick={this.saveEditedUser.bind(this)}
					>save</a>
				</td>
			</tr>
        )
    }


    render() {
        if(this.state.editing){
            return this.renderOnEditing();
        } else {
            return this.renderNormal();
        }
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        loggedUser: state.usersReducer.loggedUser,
        contactsList: state.usersReducer.contactsList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => {
            editUsers(dispatch, user);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);