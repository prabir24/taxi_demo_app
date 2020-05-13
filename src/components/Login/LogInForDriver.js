import React, { Component } from "react";
import { Link } from "react-router-dom";
import fire from "../../config/Firebase";
import "./LogIn.css";

class LogInForDriver extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }
  login(e) {

    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        var currUser = fire.auth().currentUser;
        currUser.updateProfile({
          displayName: "driver",
        }).then(function () {
          console.log("Update successful");
        }).catch(function (error) {
          console.log(error);
        });
        
        window.alert("Successfully Logged in!");
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => window.alert("Successfully Signed up!"))
      .catch((err) => {
        window.alert(err);
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //this.props.updateWho("driver");
    return (
      <div className="driver-1">
        <h4 className="text-center">Login Page for Driver</h4>
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input
                name="email"
                type="email"
                value={this.state.email}
                placeholder="email address"
                onChange={this.handleChange}
              />
              <input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.handleChange}
              />

              <div className="form-group row">
                <div className="col-md-6">
                  <button
                    onClick={this.login}
                    className="btn btn-primary btn-lg"
                  >
                    <Link to="/loginForDriver">login</Link>
                  </button>
                </div>

                <div className="col-md-6">
                  {" "}
                  <button
                    onClick={this.signup}
                    className="btn btn-primary btn-lg"
                  >
                    <Link to="/loginForDriver">Sign Up</Link>
                  </button>
                </div>
              </div>
              <p className="message">
                Forgot Your Password?
                <Link to="/registrationForDriver"><u>Click here</u></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInForDriver;
