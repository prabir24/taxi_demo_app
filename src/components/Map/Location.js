import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class Location extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentLatLng: {
          lat: 0,
          lng: 0
        },
        isMarkerShown: false
      }
    }
  
    showCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState(prevState => ({
              currentLatLng: {
                ...prevState.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              isMarkerShown: true
            }))
          }
        )
      } else {
        error => console.log(error)
      }
    }
  
  
    componentDidMount() {
      this.showCurrentLocation()
    }
  
    render() {
      return (
        <div>
          <MapWithAMarker
            isMarkerShown={this.state.isMarkerShown}
            currentLocation={this.state.currentLatLng} />
        </div>
      );
    }
  }