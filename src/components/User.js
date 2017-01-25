import React from "react";

export default class User extends React.Component {
	render(){	
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.email}</td>
			</tr>
		)
	}
}