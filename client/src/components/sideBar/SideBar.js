import React, { Component } from "react";
import "./SideBar.css";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
let socket = io.connect("https://floating-woodland-27702.herokuapp.com/", {
  secure: true
});

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
            {username}
          </p>
        </div>
        <div className="groupNav">
          <ul>
            {groups.map((group, index) => (
              <Link to={`/groups/${group}`} key={group}>
                <li
                  key={group}
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
