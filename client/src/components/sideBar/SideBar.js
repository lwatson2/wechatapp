import React, { Component } from "react";
import "./SideBar.css";
export default class SideBar extends Component {
  render() {
    const groups = ["General", "Welcome", "Movies", "Games", "Tv", "Feedback"];

    return (
      <div>
        <div className="groupNav">
          <ul>
            {groups.map((group, key) => (
              <li key={key} className="groupListItem">
                #{group}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
