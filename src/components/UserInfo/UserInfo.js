import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import './UserInfo.css';

class UserInfo extends Component {

    click = () => {
        window.history.back();
    }

    render() {
        return (
            <div className="user-info">
                <div>
                    <h1 className="text-center"> Under Development</h1>
                </div>
                <div>
                    <Button
                            className="btn_back"
                            color="primary"
                            variant="contained"
                            onClick={this.click}
                    >Back
                    </Button>
                </div>
            </div>
        );
    }


}

export default UserInfo;