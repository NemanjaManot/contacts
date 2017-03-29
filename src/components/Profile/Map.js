import React from "react";

import ol from 'openlayers';
import {connect} from "react-redux";


class Map extends React.Component {

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
        let geoLng = nextProps.loggedUser.address.geo.lng;
        let geoLat = nextProps.loggedUser.address.geo.lat;

        // Declare a Tile layer with an OSM source

        // Create latitude and longitude and convert them to default projection
        let geoLocation = ol.proj.transform([Number(geoLng), Number(geoLat)], 'EPSG:4326', 'EPSG:3857');
        //let secondLocation = ol.proj.transform([20.415638, 44.816937], 'EPSG:4326', 'EPSG:3857');

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

    render() {
        return (
            <div className="col-lg-12">
                <div id="mapa" className="map">{}</div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);