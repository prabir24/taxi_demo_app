import React, { Component} from 'react';

import '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class toolbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          hRef: "/",
        };
      }

    render() {
        
        return (
            <header className="toolbar">
                <nav className="toolbar_navigation">
                    <div className="toolbar_toggle_button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                    <div className="toolbar_logo"><a href={this.props.page}>TaXi</a></div>
                    <div className="spacer" />
                    <div className="toolbar_navigation-items">
                        <ul>
                            <li><a href="/">Travel History</a></li>
                            <li><a href="/">About us</a></li>
                            <li><a href="/">Contacts</a></li>
                            <li><a href="/"><AccountCircleIcon className="accountIcon2" >
                            </AccountCircleIcon></a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            );
        }
    }
    

export default toolbar;
