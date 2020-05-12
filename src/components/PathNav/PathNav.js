import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Label } from 'semantic-ui-react';
import HistoryIcon from '@material-ui/icons/History';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";


import './PathNav.css';
//import { red } from '@material-ui/core/colors';

class PathNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currLoc: true,
            pickUpValue: "",
            address_pick: "",
            coordinates_pick: {
                lat: 100,
                lng: 100
            },
            address_drop: "",
            coordinates_drop: {
                lat: 100,
                lng: 100
            },
            flagPick: false,
            flagDrop: false,

        };
    }

    handleSelect_pick = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setState({
            address_pick: value,
            coordinates_pick: latLng,
            flagPick: true,
        });
        console.log("Address-Pick " + this.state.address_pick);
        console.log("Address-Pick1 " + this.state.coordinates_pick.lat + " " + this.state.coordinates_pick.lng);
        console.log("Address-Pick2 " + results);
        console.log("Address-Pick3 " + latLng);

    };

    handleSelect_drop = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setState({
            address_drop: value,
            coordinates_drop: latLng,
            flagDrop: true,
        });
        console.log("Address-Pick " + this.state.address_drop);
        console.log("Address-Pick1 " + this.state.coordinates_drop.lat + " " + this.state.coordinates_drop.lng);
        console.log("Address-Pick2 " + results);
        console.log("Address-Pick3 " + latLng);
    };

    handleChange = (value, stateName) => {
        this.setState({
            [stateName]: value,
        });
        if (stateName === "address_pick") {
            this.setState({
                flagPick: false,
            });
        }
        else if (stateName === "address_drop") {
            this.setState({
                flagDrop: false,
            });
        }
        if (stateName === "address_pick" && value === "") {
            this.setState({
                currLoc: true,
            })
        }
        else if (stateName === "address_pick" && value !== "") {
            this.setState({
                currLoc: false,
            })
        }
    }


    done_action = () => {
        console.log("button_clicked");
        console.log("Pick: " + this.state.coordinates_pick );
        console.log("Drop: " + this.state.coordinates_drop );
        var v1 = this.state.coordinates_pick;
        var v2 = this.state.coordinates_drop;
        this.props.click();
        this.props.finalLocUpdate(v1, v2 );
        this.setState({
            address_pick: "",
            address_drop: "",
            flagPick: false,
            flagDrop: false,
            currLoc: true,
        });
    }

    loc_action = () => {
        this.props.locationUpdate();
        this.setState({
            flagPick: true,
            coordinates_pick: {
                lat: this.props.currLoc.lat,
                lng: this.props.currLoc.lng,
            },
            currLoc: false,
            address_pick: "YOUR CURRENT LOCATION",
        })
        console.log("Address-PickA " + this.state.address_pick);
        console.log("Address-PickB " + this.state.coordinates_pick.lat + " " + this.state.coordinates_pick.lng);
    }

    

    render() {
        let pathDrawerClasses = 'path-drawer';
        if (this.props.show) {
            pathDrawerClasses = 'path-drawer open';

        }

        return (
            <div className={pathDrawerClasses}>
                <div>
                    <ul>
                        <PlacesAutocomplete
                            value={this.state.address_pick}
                            onChange={(value) => this.handleChange(value, "address_pick")}
                            onSelect={(value) => this.handleSelect_pick(value)}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <TextField
                                        placeholder="Enter Your Pick-up Location"
                                        label="Source"
                                        //onChange={handleChange}
                                        //defaultValue={location}
                                        //value={thi.state.pickUpValue}
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        {...getInputProps({ placeholder: "Enter Your Pick-up Location" })}
                                    />

                                    <div>
                                        {this.state.currLoc ? <Button disableElevation
                                            onClick={this.loc_action}>
                                            Your Current Location</Button> : null}
                                        {loading ? <div>...loading</div> : null}

                                        {suggestions.map(suggestion => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                            };

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <br />
                        <PlacesAutocomplete
                            value={this.state.address_drop}
                            onChange={(value) => this.handleChange(value, "address_drop")}
                            onSelect={(value) => this.handleSelect_drop(value)}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <TextField
                                        placeholder="Enter Your Drop Location"
                                        label="Destination"
                                        //onChange={handleChange('destination')}
                                        //defaultValue={values.destination}
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        {...getInputProps({ placeholder: "Enter Your Drop Location" })}
                                    />
                                    <div>
                                        {loading ? <div>...loading</div> : null}

                                        {suggestions.map(suggestion => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                            };

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <br />

                        <Button
                            className="btn_done"
                            color="secondary"
                            variant="contained"
                            onClick={this.done_action}
                            disabled={!this.state.flagPick || !this.state.flagDrop}
                        >DONE</Button>
                        <br />
                        <Divider />
                        <Label>
                            <HistoryIcon />History
                        </Label>
                    </ul>

                </div>
            </div >
        );
    }

}


export default PathNav;