import React from "react";
import {connect} from "react-redux";


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
        }
    }

	renderNormal(){
		return (
			<tr>
				<td>
					{this.props.name}
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

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);