import React from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
//import firebase from "../config/Firebase";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-1">
      <div>
        <img src="./logo192.png" alt=""/>
      </div>
      <h4 className="text-center">Welcome</h4>
      <p className="text-center">Please select one of the below options</p>
      <Link to="/loginForDriver">
        <Button
          className="btn_driver"
          color="primary"
          variant="contained"
          //onClick={""}
        >Login as Driver
        </Button>
      </Link>
      <br/>
      <Link to="/loginForPassenger">
        <Button
          className="btn_passenger"
          color="primary"
          variant="contained"
          //onClick={""}
        >Login as Passenger
        </Button>
      </Link>
    </div>
  );
};

export default Home;
