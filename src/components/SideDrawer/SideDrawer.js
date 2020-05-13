import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { Label } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import fire from "../../config/Firebase";

import './SideDrawer.css';

function logout() {
    fire.auth().signOut();
}

const sideDrawer = props => {
    
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
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
                {props.loggedIn ? <li><a href="/">Travel History</a></li> : null}
                <li><a href="/">About us</a></li>   
                <li><a href="/">Contacts</a></li>
                <Divider/>
                {props.loggedIn ? <li><a href="/" onClick={logout}>Logout</a></li> : null}
            </ul>
        </nav>
    );      
};


export default sideDrawer;