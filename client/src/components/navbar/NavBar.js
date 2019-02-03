import React, { Component } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="move">
          <button className="showNav" onClick={this.props.handleSideBar}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <div className="main-nav">
            <ul className="navList">
              <li className="appName">WeChat</li>
              <li className="currentGroup">Currently in General</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
