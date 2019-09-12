import React from "react";
import "./SideBar.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
let socket = io.connect("https://floating-woodland-27702.herokuapp.com/", {
  secure: true
});

const SideBar = props => {
  const leaveRoom = () => {
    socket.emit("leaveroom", {
      currentroom: props.match.params.groupname,
      username: sessionStorage.getItem("username")
    });
    if (props.handleSideBar) {
      props.handleSideBar();
    }
  };
  const handleLogout = () => {
    Axios.get("/users/logout");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    props.history.push("/");
  };

  const groups = ["general", "welcome", "movies", "games", "tv", "feedback"];
  const username = sessionStorage.getItem("username");
  return (
    <div>
      <div className="usernameWrapper">
        <p className="usernameP">Currently logged in as {username}</p>
      </div>
      <div className="groupNav">
        <ul className="listItemContainer">
          {groups.map(group => (
            <Link to={`/groups/${group}`} key={group}>
              <li
                key={group}
                className="groupListItem"
                onClick={() => leaveRoom()}
              >
                #{group}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="logoutBtnContainer">
        <button onClick={() => handleLogout()} className="logoutBtn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default withRouter(SideBar);
