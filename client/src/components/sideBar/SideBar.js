import React, { Component } from "react";
import "./SideBar.css";
import { withRouter } from "react-router";

import { Link, Route } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
let socket = io.connect("http://localhost:5000");

class SideBar extends Component {
  leaveRoom = () => {
    socket.emit("leaveroom", {
      currentroom: this.props.match.params.groupname,
      username: sessionStorage.getItem("username")
    });
  };
  handleLogout = () => {
    Axios.get("/users/logout");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    this.props.history.push("/");
  };
  render() {
    const groups = ["general", "welcome", "movies", "games", "tv", "feedback"];
    const username = sessionStorage.getItem("username");
    return (
      <div>
        <div className="usernameWrapper">
          <p className="usernameP">
            Currently logged in as
            thisisareallylongusernamefornoapparentreasonotherthanfortesting
          </p>
        </div>
        <div className="groupNav">
          <ul>
            {groups.map((group, key) => (
              <Link to={`/groups/${group}`}>
                <li
                  key={key}
                  className="groupListItem"
                  onClick={this.leaveRoom}
                >
                  #{group}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="logoutBtnContainer">
          <button onClick={this.handleLogout} className="logoutBtn">
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SideBar);
