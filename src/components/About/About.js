import React from "react";
import {connect} from "react-redux";

import AboutUserList from "./AboutUserList";
import {fetchUsers} from "../../actions/userActions";



class About extends React.Component {

    componentDidMount(){
        this.props.getUsers();
    }

    render() {
        let aboutList = this.props.users.map((user) => {
            return (
                <AboutUserList
                    name={user.name}
                    email={user.email}
                    img={user.img}
                    company={user.company}
                    website={user.website}
                    address={user.address}
                    phone={user.phone}
                    id={user.id}
                    key={user.id}
                />
            )
        });
        return (
            <section>
                <div className="col-lg-8 col-lg-offset-2">
                    <div>
                        <h3>More information about user</h3>
                        <p>Here you can find out more about all contacts in user list.</p>
                        <p>Lorem ipsum dolor impedit ipsa maxime molestias odio
                            omnis possimus quos, repellendus reprehenderit! Lorem ipsum dolor sit amet,
                            consectetur adipisicing sit amet, consectetur adipisicing elit.
                            Aut exercitationem, quia? Ab accusamus aliquam delectus esse eveniet ex
                            explicabo hic impedit ipsa maxime molestias odio
                            omnis possimus quos, repellendus reprehenderit! Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. A aliquid corporis deleniti deserunt .
                        </p>
                    </div>

                    <div>{aboutList}</div>
                </div>
            </section>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            fetchUsers(dispatch)
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(About);