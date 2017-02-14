import React from "react";

class ContactsUserList extends React.Component {

    render() {
        return (
            <div className="aboutUsers col-lg-6 col-xs-12">
                <div>
                    <h4>{this.props.name}</h4>
                    <h5 className="companyName">{this.props.company.name}</h5>
                    <img className="usersImage img-responsive" src={this.props.img} alt="Image"/>
                </div>

                <p><span className="headSpan">Website: </span> {this.props.website} </p>

                <p> {this.props.name} have <span className="headSpan">ID of {this.props.id}</span> and he lives in {this.props.address.city}</p>

                <p><span className="headSpan">Phone: </span> {this.props.phone}</p>

                <p>
                    <span className="headSpan">About user: </span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam architecto, aspernatur atque beatae blanditiis consequuntur ea
                    exercitationem iusto maiores obcaecati odio odit officiis,
                    optio perferendis quasi ratione saepe sed veniam!
                </p>

                <hr/>
            </div>
        )
    }

}


export default ContactsUserList;