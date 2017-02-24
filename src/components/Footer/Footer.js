import React from "react";

import './footer.scss'

export class Footer extends React.Component {

    renderAdminHello(){
        let user = this.props.loggedUser;

        if(user == null) {
            return (
                <p>
                    Welcome guest!
                    Join our team, we already have {this.props.users.length} members.
                </p>
            )
        } else if(user.role == 'admin'){
            return (
                <p><i className="fa fa-star" aria-hidden="true">{}</i> You are admin <i className="fa fa-star" aria-hidden="true">{}</i></p>
            )
        } else if(user.role == 'user') {
            return (
                <p>Welcome {user.username}!</p>
            )
        }
    }

    render(){
        return (
            <footer>
                <div className="helloAdmin">
                    {this.renderAdminHello()}
                </div>
                <p>
                    &#9400; <a href="https://rs.linkedin.com/in/nemanjamanot">Nemanja Manot</a>
                </p>
            </footer>
        );
    }
}
