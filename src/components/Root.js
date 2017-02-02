import React from "react";

import {Header} from "./Header";

class App extends React.Component {
    render(){
        return (
			<div className="container-fluid">
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    {this.props.children}
                </div>
			</div>
        )
    }
}

export default App;