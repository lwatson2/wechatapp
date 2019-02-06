import React, { Component } from "react";
import "./SideBar.css";
import { Link, Route } from "react-router-dom";
import Home from "../home/Home";
export default class SideBar extends Component {
  render() {
    const groups = ["general", "welcome", "movies", "games", "tv", "feedback"];
    const username = sessionStorage.getItem("username");
    return (
      <div>
        <p>Currently logged in as {username}</p>
        <div className="groupNav">
          <ul>
            {groups.map((group, key) => (
              <Link to={`/groups/${group}`}>
                <li key={key} className="groupListItem">
                  #{group}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
