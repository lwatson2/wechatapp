import React, { Component } from "react";
import FloatingLabel from "../floatingLabel/FloatingLabel";
import { Link, Route } from "react-router-dom";
import Register from "../register/Register";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <FloatingLabel type="login" />
        <div>
          <p>Need to register?</p>
          <Link to="/">
            <p>Click here</p>
          </Link>
        </div>
        <Route exact path="/" componet={Register} />
      </div>
    );
  }
}
