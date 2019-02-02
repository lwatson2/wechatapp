import React, { Component } from "react";
import FloatingLabel from "../floatingLabel/FloatingLabel";
import { Link, Route } from "react-router-dom";
import Register from "../register/Register";
import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div className="formDiv">
        <p className="loginTxt">Please Login so you may view your messages</p>
        <FloatingLabel handleLogin={this.props.handleLogin} type="login" />
        <div className="linkWrapper">
          <p>Need to register?</p>
          <Link to="/">
            <p className="linkP">Click here</p>
          </Link>
        </div>
        <Route exact path="/" componet={Register} />
      </div>
    );
  }
}
