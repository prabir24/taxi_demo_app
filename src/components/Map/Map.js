import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import BackDrop from '../BackDrop/BackDrop';
import Icon from '@material-ui/core/Icon';
import PathNav from '../PathNav/PathNav';
import ConfirmNav from '../ConfirmNav/ConfirmNav';

import './Map.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                lat: 59.3498092,
                lng: 18.0684758
            },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            pathNavDrawerOpen: false,
            confirmDrawerOpen: false,
            pickUp: {
                lat: null,
                lng: null
            },
            dropOff: {
                lat: null,
                lng: null
            },
            flagDist: false,
            pickUpPoint: "",
            dropOffPoint: "",
            distance: 0,
            time: 0,
            confirmFlag: false,
            confirmBtnFlag: false,

        };
    }

    /*state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
        pathNavDrawerOpen: false,
    };*/

    onMarkerClick = (place, marker, e) => {
        this.setState({
            selectedPlace: place,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    backdropClickHandler = () => {
        this.setState({ pathNavDrawerOpen: false })
    }

    pathNavDrawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { pathNavDrawerOpen: !prevState.pathNavDrawerOpen };
        }, () => this.setState({
            confirmFlag: false
        }));

    };

    confirmDrawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { confirmDrawerOpen: !prevState.confirmDrawerOpen };
        });

    };

    updateCurrentLocation = () => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            });
        };
        console.log(this.state.currentLocation.lat + " " + this.state.currentLocation.lng);

    }

    UpdateConfirmBtn = () => {
        this.setState({
            confirmFlag: true,
        });
    }



    updateCalcDistFlag = (value) => {
        this.setState({
            flagDist: value,
        });
    }

    finalLocUpdate = (locP, locD) => {
        console.log("Pick: " + locP.lat + " " + locP.lng);
        console.log("Drop: " + locD.lat + " " + locD.lng);

        this.setState({
            pickUp: {
                lat: locP.lat,
                lng: locP.lng
            },
            dropOff: {
                lat: locD.lat,
                lng: locD.lng
            },
            flagDist: true,
        }, () => {
            this.calculateDistance(this.state.pickUp, this.state.dropOff);
            this.confirmDrawerToggleClickHandler();
        });

    }


    calculateDistance = (source, dest) => {

        console.log("inside: " + source.lat + " " + source.lng);
        console.log("inside1: " + dest.lat + " " + dest.lng);
        //var distance = require('google-distance-matrix');
        const google = this.props.google;
        //var distance= new google.maps.DistanceMatrixService();

        //distance.key('xxxxx');
        //distance.signature();
        //distance.units('imperial');

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [source],
                destinations: [dest],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL,
            }, callback.bind(this));

        function callback(response, status) {
            if (status === 'OK') {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
                console.log(response);
                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                        var element = results[j];
                        var dist = element.distance.text;
                        var duration = element.duration.text;
                        var from = origins[i];
                        var to = destinations[j];
                        if (j === 0) {
                            this.setState({
                                distance: dist,
                                time: duration,
                                pickUpPoint: origins[0],
                                dropOffPoint: destinations[0],
                            });

                        }
                        console.log('Distance from ' + from + ' to ' + to + ' is ' + dist + ' takes ' + duration);
                    }
                }
            }
        }
        /*distance.matrix(source, dest, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if (!distances) {
                return console.log('no distances');
            }
            console.log(distances);
            if (distances.status === 'OK') {
                for (var i = 0; i < source.length; i++) {
                    for (var j = 0; j < dest.length; j++) {
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status === 'OK') {
                            var distance = distances.rows[i].elements[j].distance.text;
                            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }
        });*/
    }

    render() {

        const iconList = {
            icon1: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
            icon2: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
            icon3: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
            icon4: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png'
        }

        let backdrop;
  
        if (this.state.pathNavDrawerOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />
        }

        /*if(this.state.pathNavDrawerOpen) {
            this.updateCurrentLocation();
        }*/

        return (
            <div>
                <div className="googleMaps">
                    <Map
                        google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={this.state.currentLocation}
                        center={this.state.currentLocation}
                        disableDefaultUI={true}
                        FullscreenControl={false}
                    >
                        {this.state.confirmFlag ? <Marker
                            position={this.state.dropOff}
                            name="End"
                            color="red"
                            draggable={false}
                            animation={this.props.google.maps.Animation.BOUNCE}
                            icon={iconList.icon4}
                        /> : null}
                        {this.state.confirmFlag ? <Marker
                            position={this.state.pickUp}
                            name="Start"
                            draggable={false}
                            animation={this.props.google.maps.Animation.BOUNCE}
                            icon={iconList.icon2}
                        /> : null }
                        
                        <Marker
                            onClick={this.onMarkerClick}
                            name={'current location'}
                            position={this.state.currentLocation}
                            pinColor={'blue'}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div className="info">
                                <p>{this.state.selectedPlace.name}</p>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                <div className="loc_book_btn">
                    <ul>
                        <button className="loc_btn" color="red" onClick={this.updateCurrentLocation}>
                            <Icon>my_location</Icon>
                        </button>
                        <button className="book_btn" type="button" onClick={this.pathNavDrawerToggleClickHandler}>Book Taxi</button>
                    </ul>
                </div>
                <PathNav show={this.state.pathNavDrawerOpen}
                    click={this.pathNavDrawerToggleClickHandler}
                    locationUpdate={this.updateCurrentLocation}
                    currLoc={this.state.currentLocation}
                    finalLocUpdate={this.finalLocUpdate}
                >
                </PathNav>
                <ConfirmNav
                    click={this.confirmDrawerToggleClickHandler}
                    confirmBtn={this.UpdateConfirmBtn}
                    show={this.state.confirmDrawerOpen}
                    pickUp={this.state.pickUpPoint}
                    dropOff={this.state.dropOffPoint}
                    distance={this.state.distance}
                    time={this.state.time}
                >
                </ConfirmNav>
                {backdrop}


            </div>

        );
    }
}


export default GoogleApiWrapper(
    (props) => ({
        apiKey: props.apiKey,
        language: props.language,
    }
    ))(MapContainer);


