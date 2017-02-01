import React from "react";

import {onChangeHandler} from '../components/justFunctions';

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

	editUser(){
		this.setState({
			editing: true
		})
	}

	saveEditedUser(){
		let savedUser = {
			name: this.state.newName,
			email: this.state.newEmail,
			id: this.props.id
		};
        this.props.editUser(savedUser);

        this.setState({
            editing: false
        })
	}


	/* -- // -- RENDER -- // -- */

	renderNormal(){
		return (
			<tr>
				<td>
					{this.props.name}
				</td>
				<td>
					{this.props.email}
					<a className="removeButton"
					   onClick={this.props.removeUser.bind(this, this.props.id)}
					>X</a>
					<a className="editButton"
					   onClick={this.editUser.bind(this)}
					>edit</a>
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
						onChange={onChangeHandler.bind(this, 'newName')}
					/>
				</td>
				<td>
					<input
						className="input-sm inputEditing"
						type="text"
						defaultValue={this.props.email}
						onChange={onChangeHandler.bind(this, 'newEmail')}
					/>
					<a className="removeButton"
					   onClick={this.props.removeUser.bind(this, this.props.id)}
					>
						X
					</a>
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

export default User;