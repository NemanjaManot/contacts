import React from "react";

import {connect} from "react-redux";


class MapButtonsContacts extends React.Component {

    getLocationLatLng(){
        return this.props.changeLocation(this.props.location.lng, this.props.location.lat, this.props.id)
    }

    render() {
        return (
            <div>
                <button onClick={this.getLocationLatLng.bind(this)} className="buttonsContacts">{this.props.username}</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapButtonsContacts);