import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./ErrorPage.css";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="errorContainer">
        <h2 className="errorTxt">Oops! Page not found.</h2>
        <Link to="/groups/welcome">
          <button className="errorBtn"> Home </button>
        </Link>
        <Route exact path="/groups/:id" />
      </div>
    );
  }
}
