import React, { Component } from "react";
import FloatingLabel from "../floatingLabel/FloatingLabel";
import { Link, Route } from "react-router-dom";
import Login from "../login/Login";
import "./Register.css";

export default class Register extends Component {
  render() {
    return (
      <div className="formDiv">
        <p className="p-text">Please regitser so that you may login</p>
        <FloatingLabel
          isRegistered={this.props.handleRegister}
          type="register"
        />
        <div>
          <p>Already registered?</p>
          <Link to="login">
            <p>Click here</p>
          </Link>
        </div>
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}
