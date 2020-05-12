import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { Label } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <div className="userInfo">
                <Button className="btn_userInfo">
                   <Link to="/userinfo" onClick={props.drawerClickHandler}><AccountCircleIcon className="accountIcon" /></Link> 
                </Button>
                <Label className="userName">Rezaul Hasan</Label>
            </div>
            <Divider />
            <ul>
                <li><a href="/">Travel History</a></li>
                <li><a href="/">About us</a></li>   
                <li><a href="/">Contacts</a></li>
            </ul>
        </nav>
    );      
};


export default sideDrawer;