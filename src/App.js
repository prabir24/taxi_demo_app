import React, { Component } from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/BackDrop/BackDrop';
import MapContainer from './components/Map/Map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo/UserInfo';

//import express from 'express';
//import cors from 'cors';

//var express = require('express');
//var cors = require('cors');
//var app = express();
//app.use(cors());

class App extends Component {
  state = {
    sideDrawerOpen: false,
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: '100%' }}>

        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />

        <Router>
          <Route path="/" component={SideDrawer} >
            <SideDrawer show={this.state.sideDrawerOpen} drawerClickHandler={this.drawerToggleClickHandler} />
            {backdrop}
          </Route>

          <Route path="/userinfo" ><UserInfo /></Route>
          <Route path="/" exact>
            <main style={{ marginTop: '60px' }}>
              <MapContainer apiKey="xxx"/>
            </main>
          </Route>

        </Router>




      </div>
    )
  }
}

export default App;