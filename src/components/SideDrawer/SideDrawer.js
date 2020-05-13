import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { Label } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import fire from "../../config/Firebase";

import './SideDrawer.css';

const sideDrawer = props => {
    
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }

    function logout() {
        fire.auth().signOut();
        if(props.who === 'driver') {
            fire.firestore().collection('driverLoc').doc('DL').delete();
            console.log("Key deleted Successfully");
        }
    }

    return (
        <nav className={drawerClasses}>
            <div className="userInfo">
                <Button className="btn_userInfo">
                   <Link to="/userInfo" onClick={props.drawerClickHandler}><AccountCircleIcon className="accountIcon" /></Link> 
                </Button>
                <Label className="userName">{props.emailId}</Label>
            </div>
            <Divider />
            <ul>
                {props.loggedIn ? (
                    <Link to="/travelhistory">Travel History</Link>
                ) : null}
                <Link to="/aboutus">About us</Link>   
                <Link to="/contacts">Contacts</Link>
                <Divider/>
                {props.loggedIn ? <li><a href="/" onClick={logout}>Logout</a></li> : null}
            </ul>
        </nav>
    );      
};


export default sideDrawer;