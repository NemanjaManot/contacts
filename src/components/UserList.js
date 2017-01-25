import React from "react";

import User from "./User";

export default class UserList extends React.Component {
	render(){
		let userNodes = this.props.users.map(function(user){
			return (
				<User
					name={user.name}
					email={user.email}
					id={user.id}
					key={user.id}
				>
					{user.name}
				</User>
			)
		});
		return (
			<div className="col-lg-10 col-lg-offset-1">
				<h1>List</h1>
				<table className="table">
					<thead>
						<tr>
							<th>User</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
                    	{userNodes}
					</tbody>
				</table>
			</div>
		)
	}
}