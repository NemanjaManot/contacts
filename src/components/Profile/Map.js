import React from "react";

import MapButtonsContacts from "./MapButtonsContacts";

import ol from 'openlayers';
import {Link} from 'react-router';
import {connect} from "react-redux";


class Map extends React.Component {

    constructor(){
        super();
        this.state = {
            overlay: 0
        };
    }


    componentDidMount() {
        // Create a View, set it center and zoom level
        this.view = new ol.View({
            center: [0, 0],
            zoom: 12
        });
        // Instanciate a Map, set the object target to the map DOM id
        this.map = new ol.Map({
            target: 'mapa'
        });
        let osmLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        // Add the created layer to the Map
        this.map.addLayer(osmLayer);
        // Set the view for the map
        this.map.setView(this.view);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.loggedUser) {
            this.drawItemOnMap(nextProps);
        }
    }

    drawItemOnMap(nextProps) {
        let geoLng = nextProps.loggedUser && nextProps.loggedUser.address.geo.lng;
        let geoLat = nextProps.loggedUser && nextProps.loggedUser.address.geo.lat;

        // Create latitude and longitude and convert them to default projection
        let geoLocation = ol.proj.transform([Number(geoLng), Number(geoLat)], 'EPSG:4326', 'EPSG:3857');

        const element = document.createElement('div');

        const newId = this.map.getOverlays().getLength() + 1;

        element.id = `new-overlay-${newId}`;

        element.className = "overlay-item";
        // an overlay to position at the center
        let overlay = new ol.Overlay({
            position: geoLocation,
            element
        });
        this.view.setCenter(geoLocation);
        this.map.addOverlay(overlay);
    }



    /* --- Overlay information's ---*/
    onClickOverlay(userId){
        this.setState({
            overlay: userId
        });
    }
    closeOverlay(){
        this.setState({
            overlay: 0
        });
    }

    overlayInformation(){
        let selectedOverlayUser = this.props.users.filter(user => {
           return user.id === this.state.overlay
        });

        let username = selectedOverlayUser.map(user => user.username);
        let phone = selectedOverlayUser.map(user => user.phone);
        let city = selectedOverlayUser.map(user => user.address.city);
        let zipcode = selectedOverlayUser.map(user => user.address.zipcode);
        let img = selectedOverlayUser.map(user => user.img);

        if(this.state.overlay){
            return (
                <div className="overlayInformation">
                <span className="closeOverlay" onClick={this.closeOverlay.bind(this)}>
                    <i className="fa fa-times" aria-hidden="true">{}</i>
                </span>
                    <img className="img img-responsive img-circle" src={img} alt="User"/>
                    <h5><strong>{username}</strong></h5>
                    <hr/>
                    <p><span className="headings">Phone: </span> {phone}</p>
                    <p><span className="headings">City: </span> {city}</p>
                    <p><span className="headings">Zipcode: </span> {zipcode}</p>
                    <p>
                        <Link to={`/userProfile/${this.state.overlay}`}>
                            <span className="headings headingsUserProfile">User profile  </span>
                        </Link>
                        <i className="fa fa-user-circle" aria-hidden="true">{}</i>
                    </p>
                </div>
            )
        }
    }

    /* --- Buttons for changing locations --- */
    changeLocation(geoLng, geoLat, userId){
        let geoLocation = ol.proj.transform([Number(geoLng), Number(geoLat)], 'EPSG:4326', 'EPSG:3857');

        const element = document.createElement('div');

        const newId = this.map.getOverlays().getLength() + 1;

        element.id = `new-overlay-${newId}`;

        element.onclick = this.onClickOverlay.bind(this, userId);

        element.className = `overlay-item`;
        // an overlay to position at the center
        let overlay = new ol.Overlay({
            position: geoLocation,
            element
        });

        this.view.setCenter(geoLocation);
        this.map.addOverlay(overlay);
    }

    render() {
        let geoLng = this.props.loggedUser && this.props.loggedUser.address.geo.lng;
        let geoLat = this.props.loggedUser && this.props.loggedUser.address.geo.lat;

        let loggedUserContacts = this.props.loggedUser && this.props.loggedUser.contacts;
        let mapButtonsContacts = this.props.users.filter(user => {
            return loggedUserContacts.find(id => id === user.id)
        }).map(user => {
            return (
                <MapButtonsContacts
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    location={user.address.geo}
                    changeLocation={this.changeLocation.bind(this)}
                    overlayInformation={this.overlayInformation.bind(this)}
                />
            )
        });

        return (
            <div className="col-lg-12">
                <h4> My location and locations of my contacts.</h4>
                <button className="btnMyLocation" onClick={this.changeLocation.bind(this, geoLng, geoLat)}>
                    <i className="fa fa-map-marker" aria-hidden="true">{}</i> My location
                </button>
                { mapButtonsContacts }
                <div id="mapa" className="map">
                    {this.overlayInformation()}
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);