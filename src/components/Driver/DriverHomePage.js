import React, { Component } from "react";
import fire from "../../config/Firebase";
import { Map, Marker } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '100%'
};

class DriverHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                lat: null,
                lng: null
            },
            pickUp: {
                lat: null,
                lng: null
            },
            dropOff: {
                lat: null,
                lng: null
            },
            passFlag: false,
        };
    }

    updateCurrentLocation = () => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                }, () => this.addCurrentLocationToDatabase());
            });
        };
        console.log(this.state.currentLocation.lat + " " + this.state.currentLocation.lng);
    }

    addCurrentLocationToDatabase = () => {

        let data = {
            email: this.props.driver,
            location: {
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng,
            }
        };
        //let driverRef = fire.firestore().collection('driverLoc').add( data);
        fire.firestore().collection('driverLoc').doc('DL').set(data);

        /*let setWithOptions = driverRef.set({
            capital: true
            }, {merge: true}, data);*/
        //this.getCurrentLocation();
    }

    deleteCurrentLocationFromDatabase = (id) => {

        fire.firestore().collection('driverLoc').doc(id).delete();
    }

    getCurrentLocation = () => {

        console.log("Here Me");
        let driverRef = fire.firestore().collection('driverLoc').doc('DL');
        driverRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

    }

    componentDidMount() {
        setInterval(() => {
            console.log('Interval triggered');
            this.updateCurrentLocation();
            this.checkForPassengers();
        }, 10000);

    }

     speak = (text) => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }

    checkForPassengers = () => {
        let passRef = fire.firestore().collection('PassLoc').doc('PA');
        passRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    this.setState({
                        passFlag: false,
                        pickUp: {
                            lat: null,
                            lng: null
                        },
                        dropOff: {
                            lat: null,
                            lng: null
                        },
                    });
                } else {
                    console.log('Document data:', doc.data());
                    this.setState({
                        passFlag: true,
                        pickUp: {
                            lat: doc.data().pickUp.lat,
                            lng: doc.data().pickUp.lng
                        },
                        dropOff: {
                            lat: doc.data().dropOff.lat,
                            lng: doc.data().dropOff.lng
                        },
                    });
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        //fire.firestore().collection('driverLoc').doc('DL').delete();
        this.speak("Intruder Alert");
    }

    render() {

        //this.getCurrentLocationFromDatabase();
        const iconList = {
            icon1: 'http://maps.google.com/mapfiles/kml/paddle/2.png',
            icon2: 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
            icon3: 'http://maps.google.com/mapfiles/kml/paddle/1.png',
            icon4: 'http://maps.google.com/mapfiles/kml/paddle/pink-circle.png'
        }

        return (

            <div className="driverHome-1">
                {this.state.passFlag ?
                    (
                        <div>
                            <Map
                                google={this.props.google}
                                zoom={14}
                                style={mapStyles}
                                initialCenter={this.state.currentLocation}
                                center={this.state.currentLocation}
                                disableDefaultUI={true}
                                FullscreenControl={false}
                            >
                                {this.state.passFlag ? <Marker
                                    position={this.state.dropOff}
                                    name="End"
                                    color="red"
                                    draggable={false}
                                    animation={this.props.google.maps.Animation.BOUNCE}
                                    icon={iconList.icon4}
                                /> : null}
                                {this.state.passFlag ? <Marker
                                    position={this.state.pickUp}
                                    name="Start"
                                    draggable={false}
                                    animation={this.props.google.maps.Animation.BOUNCE}
                                    icon={iconList.icon2}
                                /> : null}

                                <Marker
                                    onClick={this.onMarkerClick}
                                    name={'current location'}
                                    position={this.state.currentLocation}
                                    pinColor={'blue'}
                                />
                            </Map>
                            
                        </div>
                    ) :
                    (
                        <div>
                            <p className="text-center">Currently no riders request for Pick-up</p>
                            <p className="text-center">Please Wait</p>
                        </div>
                    )}
            </div>
        );
    }

}

export default DriverHome;