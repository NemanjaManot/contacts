import React from "react";
import UserList from "./UserList";

class App extends React.Component {
    render(){
        return (
			<div className="container-fluid">
				<UserList />
			</div>
        )
    }
}

export default App;