import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Label } from 'semantic-ui-react';


import './ConfirmNav.css';

class ConfirmNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            distance: 0,
            price: 0,
            driverFlag: false
        };
    }

    confirm_action = () => {
        console.log("confirm button_clicked");
        this.props.confirmBtn();
        this.props.click();
    }

    cancel_action = () => {
        console.log("cancel button_clicked");
        this.props.click();
    }

    render() {

        let confirmDrawerClasses = 'confirm-drawer';
        if (this.props.show) {
            confirmDrawerClasses = 'confirm-drawer open';
        }
        return (

            <div className={confirmDrawerClasses}>
                <div>
                    <ul>
                        <div className="labels_cfm">
                            <Label>Total Distance: {this.props.distance} </Label>
                            <br />
                            <Label>Total Duration {this.props.time} </Label>
                            <br />
                            <Label>Total Price (Approx.): ~ SEK</Label>
                            <Divider />
                        </div>

                        <div className="btns">
                            <Button
                                className="btn_confirm"
                                color="secondary"
                                variant="contained"
                                onClick={this.confirm_action}
                            >CONFIRM</Button>
                            <br />
                            <Button
                                className="btn_cancel"
                                color="secondary"
                                variant="contained"
                                onClick={this.cancel_action}
                            >CANCEL</Button>
                        </div>
                        <br />
                    </ul>
                </div>
            </div >
        );
    }
}
export default ConfirmNav;