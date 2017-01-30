import React from "react";

export default class User extends React.Component {
	render(){	
		return (
			<tr>
				<td>
					<a className="removeButton"
						onClick={this.props.removeUser.bind(this, this.props.id)}
					>
						X
					</a>
				</td>
				<td>
					{this.props.name}
				</td>
				<td>
					{this.props.email}
				</td>
			</tr>
		)
	}
}