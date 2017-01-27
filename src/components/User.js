import React from "react";

export default class User extends React.Component {
	render(){	
		return (
			<tr>
				<td>
					<button className="btn btn-danger btn-xs"
						onClick={this.props.removeUser.bind(this, this.props.id)}
					>
						X
					</button>
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