import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Webcam from "react-webcam";
import { Container, Row, Col } from 'react-bootstrap';

import './UserInfo.css';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { screenshot: null }
        this.capture = this.capture.bind(this);
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({ screenshot: imageSrc });
        console.log(this.state.screenshot)
    };

    click = () => {
        window.history.back();
    }

    render() {
        const videoConstraints = {
            width: 100,
            height: 100,
            facingMode: "user"
        };

        return (
            <div className="user-info">
                <Container fluid>
                    <Row className="row-1" >
                        <Col>
                            <Webcam
                                className="web-cam"
                                audio={false}
                                height={120}
                                ref={this.setRef}
                                screenshotFormat="image/svg"
                                width={120}
                                videoConstraints={videoConstraints}
                            />
                        </Col>
                        <Col>
                            {this.state.screenshot ? <img src={this.state.screenshot} alt={""} /> : null}
                        </Col>
                    </Row>
                    <br />
                    <Row className="row-2">
                        <Button
                            className="btn_Image"
                            color="primary"
                            variant="contained"
                            onClick={this.capture}
                        >Capture Image
                    </Button>
                    </Row>
                    <br />
                    <Row className="row-3">
                        <h1 className="text-center"> Under Development</h1>
                    </Row>
                    <br />
                    <Row className="row-4">
                        <Button
                            className="btn_back"
                            color="primary"
                            variant="contained"
                            onClick={this.click}
                        >Back
                    </Button>
                    </Row>
                </Container>
            </div>
        );
    }


}

export default UserInfo;