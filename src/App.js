import React, { Component, Fragment } from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/BackDrop/BackDrop';
import MapContainer from './components/Map/Map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo/UserInfo';
import Home from './components/Home/Home';
import LogInForDriver from "./components/Login/LogInForDriver";
import LogInForPassenger from "./components/Login/LogInForPassenger";
import fire from "./config/Firebase";
import DriverHome from './components/Driver/DriverHomePage';

//import express from 'express';
//import cors from 'cors';

//var express = require('express');
//var cors = require('cors');
//var app = express();
//app.use(cors());

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user1: null,
      loggedIn: false,
      sideDrawerOpen: false,
    };
  }


  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  }

  componentDidMount() {
    this.authListener1();
  }
  authListener1() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          user1: user,
          loggedIn: true, 
        });
        
      } else {
        this.setState({
          user1: null,
          loggedIn: false,
        });
      }
    });
  }


  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Route path="/">
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} page={"/"}/>
          </Route>
          <Route path="/" component={Home} exact />
          <Route path="/" component={SideDrawer} >
            <SideDrawer show={this.state.sideDrawerOpen} 
              drawerClickHandler={this.drawerToggleClickHandler} 
              loggedIn={this.state.loggedIn}
              emailId={this.state.loggedIn ? this.state.user1.email : "Not Logged In"}
              />
            {backdrop}
          </Route>
          <Route path="/userInfo" component={UserInfo} />
          
          {(this.state.user1 === null) ? (
            <Fragment>
              <Route path="/loginForDriver"  >
                <LogInForDriver />
              </Route>
              <Route path="/loginForPassenger"  >
                <LogInForPassenger />
              </Route>
            </Fragment>
          ) : (
              <Fragment>
                <Route path="/loginForPassenger">
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} page={"/loginForPassenger"}/>
                  <main style={{ marginTop: '60px' }}>
                    <MapContainer apiKey="xxx" />
                  </main>
                </Route>
                <Route path="/loginForDriver" >
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} page={"/loginForDriver"}/>
                  <main style={{ marginTop: '60px' }}>
                    <DriverHome/>
                  </main>
          </Route>
              </Fragment>
            )}
        </Router>
      </div>
    )
  }
}

export default App;
