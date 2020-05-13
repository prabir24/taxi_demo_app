import React, { Component } from "react";



class DriverHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLocation: {
                lat: 0,
                lng: 0
            }
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
                });
            });
        };
        console.log(this.state.currentLocation.lat + " " + this.state.currentLocation.lng);
    }
    
    render() {
        return (
            <div className="driverHome-1">
                <p className="text-center">Currently no riders request for Pick-up</p>
                <p className="text-center">Please Wait</p>
            </div>
            );
    }

}

export default DriverHome;